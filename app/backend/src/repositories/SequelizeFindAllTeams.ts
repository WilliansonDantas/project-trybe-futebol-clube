import ITeams from '../interfaces/ITeams';
import { ITeamsRepository } from '../services/TeamsService';
import Teams from '../database/models/Teams';

export default class SequelizeFindAllTeams implements ITeamsRepository {
  private _teams = Teams;
  async findAll(): Promise<ITeams[] | []> {
    const data = await this._teams.findAll();
    return data;
  }
}
