import IMatches from '../interfaces/IMatches';

export interface IMatchesPostRepository {
  create(
    body: IMatches,
    inProgress: boolean
  ): Promise< IMatches>
}

export default class MatchesPostService {
  private _repository;

  constructor(repository: IMatchesPostRepository) {
    this._repository = repository;
  }

  async create(
    body: IMatches,
    inProgress: boolean,
  ) {
    const newItem = await this._repository
      .create(body, inProgress);
    return newItem;
  }
}
