import { Container } from 'typedi';
import { UserRepository } from '../../Repository';
import { Post, Body, Get, Param, JsonController, NotAcceptableError } from 'routing-controllers';
import { User } from '../../Entity/User';
import { IUserRepository } from '../../Interface/IUserRepository';
import { GymEvent } from '../../Entity';
import { v4 as uuidv4 } from 'uuid';

@JsonController()
export class UserController {
  private userQueryService: IUserRepository;

  constructor() {
    this.userQueryService = Container.get(UserRepository);
  }

  @Post('/register-user')
  async registerUser(@Body() payload: User): Promise<any> {
    if (!payload.username || !payload.email || !payload.password) {
      throw new NotAcceptableError(`
        <p>Please provide all required fields.</p>
        <p>Please provide valid username, email and password and then try again.</p>
      `);
    }

    if (!payload.email.match(/^[A-Za-z]+[._-]?[A-Za-z0-9]*[@][A-Za-z0-9]{2,}\.[a-z]{2,6}$/g)) {
      throw new NotAcceptableError(
        'Please provide a valid email address.'
      );
    }

    if (payload.password.length < 6 || payload.password.length > 15) {
      throw new NotAcceptableError(
        'Password should be between 6 to 15 characters.'
      );
    }

    const newUser = payload;
    newUser.barcode = uuidv4();

    return this.userQueryService.registerUser(payload);
  }

  @Get('/user/:id')
  public viewUser(@Param('id') id: number): Promise<User> {
    return this.userQueryService.viewUser(id);
  }

  @Post('/user/:id')
  public updateUser(@Param('id') id: number, @Body() payload: Partial<User>): Promise<any> {
    // if (!payload.email.match(/^[A-Za-z]+[._-]?[A-Za-z0-9]*[@][A-Za-z0-9]{2,}\.[a-z]{2,6}$/g)) {
    //   throw new NotAcceptableError(
    //     'Please provide a valid email address.'
    //   );
    // }

    // if (!payload.firstName) {
    //   throw new NotAcceptableError('First name cannot be blank.');
    // }

    return this.userQueryService.updateUser(id, payload);
  }

  @Get('/user/:id/events')
  public getUserEvents(@Param('id') id: number): Promise<GymEvent[]> {
    return this.userQueryService.getUserEvents(id);
  }
}
