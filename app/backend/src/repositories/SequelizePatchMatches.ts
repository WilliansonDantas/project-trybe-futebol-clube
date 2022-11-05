import { IMatchesPatchRepository } from '../services/MatchesPatchService';
import Matches from '../database/models/Matches';

export default class SequelizePatchMatches implements IMatchesPatchRepository {
  private _matches = Matches;
  async update(
    id: number,
  ): Promise< void> {
    await this._matches.update({ inProgress: false }, { where: { id } });
  }
}
