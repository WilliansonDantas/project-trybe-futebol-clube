import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _service;

  constructor(service: MatchesService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const all = await this._service.findAll();
    res.status(200).json(all);
  }
}
