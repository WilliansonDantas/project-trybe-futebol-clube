import { IMatchesPatchIdRepository } from '../services/MatchesPatchIdService';
import Matches from '../database/models/Matches';

export default class SequelizePatchIdMatches implements IMatchesPatchIdRepository {
  private _matches = Matches;
  async update(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: number,
  ): Promise< void> {
    await this._matches.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
  }
}
