import { Service } from 'typedi';
import { Repository, ObjectType } from 'typeorm';
import { getRepository } from '../Config';
import { User } from '../Entity';

@Service()
export class UserRepository {
  private async getRepository<T>(repo: ObjectType<T>): Promise<Repository<T>> {
    return await getRepository(repo);
  }

  public async registerUser(payload: Partial<User>): Promise<User> {
    return (await this.getRepository(User)).save(payload);
  }

  public async viewUser(id: number): Promise<User> {
    return (await this.getRepository(User)).findOne(id);
  }

  public async getUser(username: string, password: string): Promise<User> {
    return (await this.getRepository(User)).findOne({ where: { username, password } });
  }
}
