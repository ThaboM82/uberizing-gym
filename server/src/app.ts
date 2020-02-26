import 'reflect-metadata';
import { createExpressServer, Action } from 'routing-controllers';
import { UserController, AuthController } from './Controller';
import { TokenUtils } from './Utils';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true,
  authorizationChecker: async (action: Action) => {
    const token = action.request.headers['authorization'];
    const user = TokenUtils.verifyToken(token);
    return user ? true : false;
  },
  controllers: [UserController, AuthController],
});

// run express application on port 3030
app.listen(3030);
