import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../utils/HttpException';
import MatchesPostService from '../services/MatchesPostService';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

export default class MatchesPostController {
  private _service;
  private _jwt = jwt;

  constructor(service: MatchesPostService) {
    this._service = service;
  }

  async create(req: Request, res: Response) {
    const token = req.header('Authorization') as string;
    this.decodify(token);
    console.log(req.body);
    const inProgress = true;
    const newItem = await this._service
      .create(req.body, inProgress);
    console.log(newItem);
    return res.status(201).json(newItem);
  }

  private decodify(token: string) {
    console.log(secret);

    try {
      const payloadVerify = this._jwt.verify(token, secret) as jwt.JwtPayload;
      return payloadVerify;
    } catch (e) {
      throw new HttpException(404, 'Expired or invalid token');
    }
  }
}
