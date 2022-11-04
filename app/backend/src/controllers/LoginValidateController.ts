import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

export default class loginValidateRouter {
  private _jwt = jwt;

  public async role(req: Request, res: Response) {
    const token = req.header('Authorization');
    if (!token) {
      throw new Error('Expired or invalid token');
    }
    const { role } = this.decodify(token);
    return res.status(200).json({ role });
  }

  private decodify(token: string) {
    try {
      const payloadVerify = this._jwt.verify(token, secret) as jwt.JwtPayload;
      return payloadVerify;
    } catch (e) {
      const err = new Error('Expired or invalid token');
      throw err;
    }
  }
}
