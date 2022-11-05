import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  private _service;

  constructor(service: TeamsService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const all = await this._service.findAll();
    res.status(200).json(all);
  }
}
