export interface IMatchesPatchIdRepository {
  update(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: number,
  ): Promise< void>
}

export default class MatchesPatchIdService {
  private _repository;

  constructor(repository: IMatchesPatchIdRepository) {
    this._repository = repository;
  }

  async update(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: number,
  ) {
    const altScoreboard = await this._repository
      .update(homeTeamGoals, awayTeamGoals, id);
    return altScoreboard;
  }
}
