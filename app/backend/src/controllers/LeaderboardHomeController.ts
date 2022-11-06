import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHomeService';

export default class LeaderboardHomeController {
  private _service;

  constructor(service: LeaderboardHomeService) {
    this._service = service;
  }

  async objTable(req: Request, res: Response) {
    const informationAll = await this._service.main();
    return res.status(200).json(informationAll);
  }
}
