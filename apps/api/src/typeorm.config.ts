import { DataSource } from 'typeorm';
import { join } from 'path';
import * as process from 'process';

// 从环境变量中获取配置
const getEnv = (key: string, defaultValue: any) => {
  return process.env[key] || defaultValue;
};

export default new DataSource({
  type: 'mysql',
  host: getEnv('DB_HOST', 'localhost'),
  port: parseInt(getEnv('DB_PORT', '3306'), 10),
  username: getEnv('DB_USERNAME', 'root'),
  password: getEnv('DB_PASSWORD', ''),
  database: getEnv('DB_DATABASE', 'orca_system'),
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  synchronize: false,
});
