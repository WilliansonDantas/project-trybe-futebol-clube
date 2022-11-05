import { Request, Response } from 'express';
import TeamsIdService from '../services/TeamsIdService';

export default class TeamsIdController {
  private _service;

  constructor(service: TeamsIdService) {
    this._service = service;
  }

  async getId(req: Request, res: Response) {
    const { id } = req.params;
    const teamId = await this._service.findByPk(Number(id));
    res.status(200).json(teamId);
  }
}
