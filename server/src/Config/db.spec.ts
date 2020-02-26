import { getConnection, Connection, Repository } from 'typeorm';
import { getDBConnection, getRepository } from '.';
import { User } from '../Entity';

afterEach(async () => {
  await getConnection().close();
});

describe('DB Connection with TypeORM', () => {
  it('should establish a successful DB connection', async () => {
    const connection = await getDBConnection();
    expect(connection).toBeInstanceOf(Connection);
  });

  it('should get a repository successfully', async () => {
    const repository = await getRepository(User);
    expect(repository).toBeInstanceOf(Repository);
  });
});
