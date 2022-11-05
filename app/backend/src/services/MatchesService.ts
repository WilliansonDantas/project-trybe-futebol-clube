import IMatches from '../interfaces/IMatches';

export interface IMatchesRepository {
  findAll(): Promise< IMatches[] | []>
}

export default class MatchesService {
  private _repository;

  constructor(repository: IMatchesRepository) {
    this._repository = repository;
  }

  async findAll() {
    const all = await this._repository.findAll();
    return all;
  }
}
