import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../utils/HttpException';
import IUser from '../interfaces/IUser';
import SequelizeFindOneUser from '../repositories/SequelizeFindOneUser';
import LoginService from '../services/LoginService';
// import LoginValidation from '../validations/LoginValidation';

const sequelizeFindOneUser = new SequelizeFindOneUser();
const loginService = new LoginService(sequelizeFindOneUser);
const secret = process.env.JWT_SECRET || 'seusecretdetoken';
const error401 = 'Incorrect email or password';

export default class LoginController {
  private _compare = compare;
  private _jwt = jwt;

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    LoginController.bodyValidated(email, password);
    LoginController.emailValidated(email);
    LoginController.passwordValidated(password);
    const user = await loginService.findOneUser(email);
    if (!user) {
      throw new HttpException(401, error401);
    }
    const boolDecode = await this.decodify(password, user.password);
    if (!boolDecode) {
      throw new HttpException(401, error401);
    }
    const token = this.token(user);
    return res.status(200).json({ token });
  }

  private static bodyValidated(email: string, password: string) {
    if (!email || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }
  }

  private static emailValidated(email: string) {
    if (email.match(/\S+@\S+\.\S+/) === null) {
      throw new HttpException(401, error401);
    }
  }

  private static passwordValidated(password: string) {
    if (password.length <= 6) {
      throw new HttpException(401, error401);
    }
  }

  private async decodify(password: string, hash: string): Promise<boolean> {
    const validatePassword = await this._compare(password, hash);
    return validatePassword;
  }

  private token(user: IUser): string {
    const { id, username, role, email } = user;
    const payload = { id, username, role, email };
    const token = this._jwt.sign(payload, secret);
    return token;
  }
}
