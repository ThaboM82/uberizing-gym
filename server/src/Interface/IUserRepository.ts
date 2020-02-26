import { User } from '../Entity/User';
import { UserPayload } from '../Repository';

export interface IUserRepository {
  registerUser: (payload: UserPayload) => Promise<User>;
  viewUser: (id: number) => Promise<User>;
  getUser: (username: string, password: string) => Promise<User>;
}
