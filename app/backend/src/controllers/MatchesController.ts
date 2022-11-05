import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _service;

  constructor(service: MatchesService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const all = await this._service.findAll();
    let matchesAll = all;
    if (inProgress) {
      matchesAll = all.filter((match) => match.inProgress === (inProgress === 'true'));
    }
    res.status(200).json(matchesAll);
  }
}
