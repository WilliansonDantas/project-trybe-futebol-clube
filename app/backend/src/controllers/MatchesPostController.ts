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
    const { homeTeam, awayTeam } = req.body;
    // const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    MatchesPostController.teamsDifferent(homeTeam, awayTeam);
    const token = req.header('Authorization') as string;
    this.decodify(token);
    const inProgress = true;
    const newItem = await this._service.create(req.body, inProgress);
    return res.status(201).json(newItem);
  }

  private decodify(token: string) {
    try {
      const payloadVerify = this._jwt.verify(token, secret) as jwt.JwtPayload;
      return payloadVerify;
    } catch (e) {
      throw new HttpException(404, 'Expired or invalid token');
    }
  }

  private static teamsDifferent(homeTeam: number, awayTeam: number) {
    if (Number(homeTeam) === Number(awayTeam)) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }
  }

  // private static emailValidated(email: string) {
  //   if (email.match(/\S+@\S+\.\S+/) === null) {
  //     throw new HttpException(401, error401);
  //   }
  // }

  // private static passwordValidated(password: string) {
  //   if (password.length <= 6) {
  //     throw new HttpException(401, error401);
  //   }
  // }
}
