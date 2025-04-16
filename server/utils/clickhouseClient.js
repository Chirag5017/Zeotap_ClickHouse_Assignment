import { ClickHouse as ClickHouseClient } from 'clickhouse';
import dotenv from 'dotenv';

dotenv.config();

export const ClickHouse = new ClickHouseClient({
  url: process.env.CLICKHOUSE_URL,
  port: process.env.CLICKHOUSE_PORT,
  debug: false,
  basicAuth: {
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD,
  },
  isUseGzip: false,
  format: 'json',
});
