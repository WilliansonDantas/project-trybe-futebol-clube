import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import SequelizeFindOneUser from '../repositories/SequelizeFindOneUser';
import LoginService from '../services/LoginService';

const sequelizeFindOneUser = new SequelizeFindOneUser();
const loginService = new LoginService(sequelizeFindOneUser);
const secret = process.env.JWT_SECRET || 'seusecretdetoken';

export default class LoginController {
  private _compare = compare;
  private _jwt = jwt;

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await loginService.findOneUser(email);
    if (!user) {
      throw new Error('Usuário não localizado');
    }
    const boolDecode = await this.decodify(password, user.password);
    if (!boolDecode) {
      throw new Error('Senha deu ruim');
    }
    const token = this.token(user);
    return res.status(200).json({ token });
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