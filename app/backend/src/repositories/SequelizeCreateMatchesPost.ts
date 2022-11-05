import IMatches from '../interfaces/IMatches';
import { IMatchesPostRepository } from '../services/MatchesPostService';
import Matches from '../database/models/Matches';

export default class SequelizeCreateMatchesPost implements IMatchesPostRepository {
  private _matches = Matches;
  async create(
    body: IMatches,
    inProgress: boolean,
  ): Promise< IMatches> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const newItem = await this._matches.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    return newItem;
  }
}
