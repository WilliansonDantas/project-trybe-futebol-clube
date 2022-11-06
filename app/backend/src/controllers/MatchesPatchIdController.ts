import { Request, Response } from 'express';
import MatchesPatchIdService from '../services/MatchesPatchIdService';

export default class MatchesPatchIdController {
  private _service;

  constructor(service: MatchesPatchIdService) {
    this._service = service;
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service
      .update(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}
