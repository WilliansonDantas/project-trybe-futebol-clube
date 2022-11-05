import ITeams from '../interfaces/ITeams';
import { ITeamsIdRepository } from '../services/TeamsIdService';
import Teams from '../database/models/Teams';

export default class SequelizeFindByPkTeams implements ITeamsIdRepository {
  private _teams = Teams;
  async findByPk(id: number): Promise<ITeams | null> {
    const data = await this._teams.findByPk(id);
    return data;
  }
}
