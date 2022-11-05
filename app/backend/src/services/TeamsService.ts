import ITeams from '../interfaces/ITeams';

export interface ITeamsRepository {
  findAll(): Promise< ITeams[] | []>
}

export default class TeamsService {
  private _repository;

  constructor(repository: ITeamsRepository) {
    this._repository = repository;
  }

  async findAll() {
    const all = await this._repository.findAll();
    return all;
  }
}
