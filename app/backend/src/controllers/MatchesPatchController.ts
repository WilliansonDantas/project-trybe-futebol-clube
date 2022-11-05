import { Request, Response } from 'express';
import MatchesPatchService from '../services/MatchesPatchService';

export default class MatchesPatchController {
  private _service;

  constructor(service: MatchesPatchService) {
    this._service = service;
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.update(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}
