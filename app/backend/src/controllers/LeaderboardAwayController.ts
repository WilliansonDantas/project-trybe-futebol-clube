import { Request, Response } from 'express';
import LeaderboardAwayService from '../services/LeaderboardAwayService';

export default class LeaderboardAwayController {
  private _service;

  constructor(service: LeaderboardAwayService) {
    this._service = service;
  }

  async objTable(req: Request, res: Response) {
    const informationAll = await this._service.main();
    res.status(200).json(informationAll);
  }
}
