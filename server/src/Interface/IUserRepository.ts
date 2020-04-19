import { User } from '../Entity/User';

export interface IUserRepository {
  registerUser: (payload: User) => Promise<User>;
  viewUser: (id: number) => Promise<User>;
  getUser: (username: string, password: string) => Promise<User>;
  updateUser: (id: number, payload: Partial<User>) => Promise<User>;
}
