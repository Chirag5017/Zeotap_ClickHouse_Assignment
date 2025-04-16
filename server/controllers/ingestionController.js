import fs from 'fs';
import csv from 'csv-parser';
import { ClickHouse as ClickHouseClient } from 'clickhouse';

export const uploadCSVToClickhouse = async (req, res) => {
  try {
    const filePath = req.file.path;
    const { tableName, host, port, database, token } = req.body;

    const clickhouse = new ClickHouseClient({
      url: host,
      port: port,
      debug: false,
      basicAuth: {
        username: 'user',
        password: 'user'
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
      database,
      format: 'json',
    });

    const records = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => records.push(data))
      .on('end', async () => {
        const insertQuery = `INSERT INTO ${tableName} FORMAT JSONEachRow`;
        await clickhouse.insert(insertQuery, records);
        res.json({ message: 'Upload successful', count: records.length });
      });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchClickhouseToFlatFile = async (req, res) => {
  try {
    const { host, port, database, token, tableName, columns } = req.body;

    const clickhouse = new ClickHouseClient({
      url: host,
      port: port,
      debug: false,
      basicAuth: {
        username: 'user',
        password: 'user',
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
      database,
      format: 'json',
    });

    const query = `SELECT ${columns.join(',')} FROM ${tableName}`;
    const result = await clickhouse.query(query).toPromise();
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
