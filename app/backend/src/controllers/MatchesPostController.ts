import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../utils/HttpException';
import MatchesPostService from '../services/MatchesPostService';
import TeamsIdService from '../services/TeamsIdService';
import SequelizeFindByPkTeams from '../repositories/SequelizeFindByPkTeams';
import 'express-async-errors';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const sequelizeFindByPkTeams = new SequelizeFindByPkTeams();
const teamsIdService = new TeamsIdService(sequelizeFindByPkTeams);

export default class MatchesPostController {
  private _service;
  private _jwt = jwt;

  constructor(service: MatchesPostService) {
    this._service = service;
  }

  async create(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;

    // const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    // const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    MatchesPostController.teamsDifferent(Number(homeTeam), Number(awayTeam));
    await MatchesPostController.teamsExist(Number(homeTeam), Number(awayTeam));
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
    if (homeTeam === awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }
  }

  private static async teamsExist(homeTeam: number, awayTeam: number) {
    const teamHome = await teamsIdService.findByPk(homeTeam);
    const teamAway = await teamsIdService.findByPk(awayTeam);
    if (!teamHome || !teamAway) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }
}
