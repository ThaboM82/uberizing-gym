import { JsonController, Post, Body, NotFoundError } from 'routing-controllers';
import { IUserRepository } from '../../Interface/IUserRepository';
import Container from 'typedi';
import { UserRepository } from '../../Repository';
import { TokenUtils } from '../../Utils';
import { User } from '../../Entity';

interface LoginPayload {
  username: string;
  password: string;
}

@JsonController()
export class AuthController {
  private userQueryService: IUserRepository;

  constructor() {
    this.userQueryService = Container.get(UserRepository);
  }

  @Post('/login')
  public async login(@Body() payload: LoginPayload): Promise<string> {
    if (!payload.username || !payload.password) {
      throw new NotFoundError('Username or Password cannot be empty.');
    }

    const user: User = await this.userQueryService.getUser(payload.username, payload.password);
    const { firstName, lastName, username, userType, email } = user;

    if (user) {
      return TokenUtils.getToken({ firstName, lastName, username, userType, email });
    }
  }

  @Post('/verify-token')
  public verifyToken(@Body() payload: { token: string }): string | object {
    return TokenUtils.verifyToken(payload.token);
  }
}
