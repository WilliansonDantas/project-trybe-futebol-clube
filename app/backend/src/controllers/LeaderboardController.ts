import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _service;

  constructor(service: LeaderboardService) {
    this._service = service;
  }

  async objTable(req: Request, res: Response) {
    const informationAll = await this._service.main();
    return res.status(200).json(informationAll);
  }
}
