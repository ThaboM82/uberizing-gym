import { ConnectionOptions, getConnectionManager, Connection, createConnection, ObjectType, Repository } from 'typeorm';
import * as appModules from '../Entity';
import * as env from 'dotenv';

env.config();

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number.parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: 'egym',
  bigNumberStrings: true,
  dateStrings: true,
  connectTimeout: 30000,
  entities: [...Object.values(appModules)],
  // debug: ['ComQueryPacket', 'RowDataPacket'],
};

export const getDBConnection = async (): Promise<Connection> => {
  const connectionName = 'default';
  const connectionManager = getConnectionManager();
  let connection: Connection;

  if (connectionManager.has(connectionName)) {
    connection = connectionManager.get(connectionName);
    if (!connection.isConnected) {
      connection = await connection.connect();
    }
  } else {
    connection = await createConnection(connectionOptions);
  }

  return connection;
};

export const getRepository = async <T>(repo: ObjectType<T>): Promise<Repository<T>> => {
  const dbConnection = await getDBConnection();
  return dbConnection.getRepository(repo);
};
