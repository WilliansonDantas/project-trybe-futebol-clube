import IMatches from '../interfaces/IMatches';
import { IMatchesRepository } from '../services/MatchesService';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class SequelizeFindAllMatches implements IMatchesRepository {
  private _matches = Matches;
  async findAll(): Promise<IMatches[] | []> {
    const data = await this._matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return data;
  }
}
