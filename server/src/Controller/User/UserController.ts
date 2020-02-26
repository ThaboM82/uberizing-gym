import { Container } from 'typedi';
import { UserRepository, UserPayload } from '../../Repository';
import { Post, Body, Get, Param, JsonController } from 'routing-controllers';
import { User } from '../../Entity/User';
import { IUserRepository } from '../../Interface/IUserRepository';

@JsonController()
export class UserController {
  private userQueryService: IUserRepository;

  constructor() {
    this.userQueryService = Container.get(UserRepository);
  }

  @Post('/register-user')
  public registerUser(@Body() payload: UserPayload): Promise<User> {
    return this.userQueryService.registerUser(payload);
  }

  @Get('/user/:id')
  public viewUser(@Param('id') id: number): Promise<User> {
    return this.userQueryService.viewUser(id);
  }
}
