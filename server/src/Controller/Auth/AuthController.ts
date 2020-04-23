import { JsonController, Post, Body, NotFoundError, NotAcceptableError } from 'routing-controllers';
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
  public async login(@Body() payload: LoginPayload): Promise<any> {
    if (!payload.username || !payload.password) {
      throw new NotAcceptableError(`
        <p>Username or Password cannot be empty.</p>
        <p>Please provide valid username and password and then try again.</p>
      `);
    }

    const user: User = await this.userQueryService.getUser(payload.username, payload.password);

    if (!user) {
      throw new NotFoundError(`
        <p>User not found with given username and password.</p>
        <p>If you are new to the system please use above Register link to create new account.</p>
      `);
    }

    const { id, firstName, lastName, username, userType, email } = user;
    return TokenUtils.getToken({ id, firstName, lastName, username, userType, email });
  }

  @Post('/verify-token')
  public verifyToken(@Body() payload: { token: string }): string | object {
    return TokenUtils.verifyToken(payload.token);
  }
}
