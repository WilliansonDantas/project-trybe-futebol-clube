export interface IMatchesPatchRepository {
  update(
    id: number,
  ): Promise< void>
}

export default class MatchesPatchService {
  private _repository;

  constructor(repository: IMatchesPatchRepository) {
    this._repository = repository;
  }

  async update(
    id: number,
  ) {
    const altInProgress = await this._repository
      .update(id);
    return altInProgress;
  }
}
