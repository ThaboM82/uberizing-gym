import { Service } from 'typedi';
import { Repository, ObjectType } from 'typeorm';
import { getRepository } from '../Config';
import { User } from '../Entity';

export interface UserPayload {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  userType: string;
  email: string;
  birthDate: string;
  phone: string;
  gender: string;
  profileImage: string;
}

@Service()
export class UserRepository {
  private async getRepository<T>(repo: ObjectType<T>): Promise<Repository<T>> {
    return await getRepository(repo);
  }

  public async registerUser(payload: Partial<UserPayload>): Promise<User> {
    return (await this.getRepository(User)).save(payload);
  }

  public async viewUser(id: number): Promise<User> {
    return (await this.getRepository(User)).findOne(id);
  }

  public async getUser(username: string, password: string): Promise<User> {
    return (await this.getRepository(User)).findOne({ where: { username, password } });
  }
}
