import { Container } from 'typedi';
import { UserRepository } from '../../Repository';
import { Post, Body, Get, Param, JsonController, NotAcceptableError } from 'routing-controllers';
import { User } from '../../Entity/User';
import { IUserRepository } from '../../Interface/IUserRepository';
// import { validate } from 'class-validator';

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
        <p>Empty form cannot be submitted.</p>
        <p>Please provide valid username, email and password and then try again.</p>
      `);
    }

    // const errors = await validate(payload);
    // console.log(errors);
    // let errorMessage = '';
    // if (errors.length > 0) {
    //   for (const error of errors) {
    //     errorMessage += `<p>Validation Error: ${error}</p>`;
    //   }
    //   console.log(123);
    //   throw new NotAcceptableError(errorMessage);
    // }

    return this.userQueryService.registerUser(payload);
  }

  @Get('/user/:id')
  public viewUser(@Param('id') id: number): Promise<User> {
    return this.userQueryService.viewUser(id);
  }
}
