import ITeams from '../interfaces/ITeams';

export interface ITeamsIdRepository {
  findByPk(id:number): Promise< ITeams | null>
}

export default class TeamsIdService {
  private _repository;

  constructor(repository: ITeamsIdRepository) {
    this._repository = repository;
  }

  async findByPk(id: number) {
    const teamId = await this._repository.findByPk(id);
    return teamId;
  }
}
