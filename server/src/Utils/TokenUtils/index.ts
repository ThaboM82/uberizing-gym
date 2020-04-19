import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  userType: string;
  email: string;
}

@Service()
export class TokenUtils {
  private jwtPrivateKey: string;
  private jwtOptions: SignOptions;

  constructor() {
    this.jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
    this.jwtOptions = {
      expiresIn: '90m',
    };
  }

  public getToken(payload: TokenPayload): string {
    return jwt.sign({ ...payload }, this.jwtPrivateKey, this.jwtOptions);
  }

  public verifyToken(token: string): string | object {
    try {
      const plainToken = token ? token.replace(/^Bearer /, '') : null;
      return jwt.verify(plainToken, this.jwtPrivateKey, this.jwtOptions);
    } catch (error) {
      return null;
    }
  }
}

export default new TokenUtils();
