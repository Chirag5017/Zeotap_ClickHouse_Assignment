import fs from 'fs';
import csv from 'csv-parser';
import { ClickHouse } from '../utils/clickhouseClient.js';

export const uploadCSVToClickhouse = async (req, res) => {
  try {
    const filePath = req.file.path;
    const tableName = req.body.tableName;
    const records = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => records.push(data))
      .on('end', async () => {
        const insertQuery = `INSERT INTO ${tableName} FORMAT JSONEachRow`;
        await ClickHouse.insert(insertQuery, records);
        res.json({ message: 'Upload successful', count: records.length });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchClickhouseToFlatFile = async (req, res) => {
  try {
    const { tableName, columns } = req.body;
    const query = `SELECT ${columns.join(',')} FROM ${tableName}`;
    const result = await ClickHouse.query(query).toPromise();
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
