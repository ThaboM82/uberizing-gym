import { Service } from 'typedi';
import { Repository, ObjectType } from 'typeorm';
import { getRepository } from '../Config';
import { User } from '../Entity';
import { NotFoundError } from 'routing-controllers';

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
    return (await this.getRepository(User)).findOne({ where: [
      { username, password },
      { email: username, password }
    ] });
  }

  public async updateUser(id: number, payload: Partial<User>): Promise<User> {
    const existingUser = await (await getRepository(User)).findOne(id);

    if (!existingUser) {
      throw new NotFoundError('User not found');
    }

    existingUser.firstName = payload.firstName;
    existingUser.lastName = payload.lastName;
    existingUser.birthDate = payload.birthDate;
    existingUser.phone = payload.phone;
    existingUser.gender = payload.gender;
    existingUser.streetAddress = payload.streetAddress;
    existingUser.streetAddress2 = payload.streetAddress2;
    existingUser.city = payload.city;
    existingUser.state = payload.state;
    existingUser.zip = payload.zip;
    existingUser.country = payload.country;

    return await (await getRepository(User)).save(existingUser);
  }
}
