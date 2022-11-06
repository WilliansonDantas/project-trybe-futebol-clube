import MatchesService from './MatchesService';
import SequelizeFindAllMatches from '../repositories/SequelizeFindAllMatches';
import IMatches from '../interfaces/IMatches';
import ILeaderboardAway from '../interfaces/ILeaderboardAway';

const sequelizeFindAllMatches = new SequelizeFindAllMatches();
const matchesService = new MatchesService(sequelizeFindAllMatches);

export default class LeaderboardHomeService {
  private _matchers: IMatches[];
  private _leaderboard: ILeaderboardAway[] = [];

  async main() {
    await this.findAll();
    this.filter();
    this.arrayLeaderboardAway();
    this.sortLeaderboard();
    return this._leaderboard;
  }

  private async findAll() {
    this._matchers = await matchesService.findAll();
  }

  private filter() {
    this._matchers = this._matchers.filter((match) => match.inProgress === false);
  }

  private objLeaderboard(match: IMatches) {
    const leaderboardAway = {
      name: match.teamAway?.teamName,
      totalPoints: this.totalPoints(match),
      totalGames: this.totalGames(match),
      totalVictories: this.totalVictories(match),
      totalDraws: this.totalDraws(match),
      totalLosses: this.totalLosses(match),
      goalsFavor: this.goalsFavor(match),
      goalsOwn: this.goalsOwn(match),
      goalsBalance: this.goalsBalance(match),
      efficiency: this.efficiency(match),
    };
    return leaderboardAway;
  }

  private arrayLeaderboardAway() {
    const arrayLeaderboardA: ILeaderboardAway[] = [];
    this._matchers.forEach((match) => {
      if (!arrayLeaderboardA
        .some((leaderboard: ILeaderboardAway) => leaderboard.name === match?.teamAway?.teamName)) {
        arrayLeaderboardA.push(this.objLeaderboard(match));
      }
    });
    this._leaderboard = arrayLeaderboardA;
  }

  private totalGames(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.awayTeam === match.awayTeam) {
        acumulator += 1;
      }
    });
    return acumulator;
  }

  private totalVictories(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.awayTeam === match.awayTeam && matcher.awayTeamGoals > matcher.homeTeamGoals) {
        acumulator += 1;
      }
    });
    return acumulator;
  }

  private totalDraws(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.awayTeam === match.awayTeam && matcher.awayTeamGoals === matcher.homeTeamGoals) {
        acumulator += 1;
      }
    });
    return acumulator;
  }

  private totalLosses(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.awayTeam === match.awayTeam && matcher.awayTeamGoals < matcher.homeTeamGoals) {
        acumulator += 1;
      }
    });
    return acumulator;
  }

  private goalsFavor(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.awayTeam === match.awayTeam) {
        acumulator += matcher.awayTeamGoals;
      }
    });
    return acumulator;
  }

  private goalsOwn(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.awayTeam === match.awayTeam) {
        acumulator += matcher.homeTeamGoals;
      }
    });
    return acumulator;
  }

  private goalsBalance(match: IMatches) {
    const goalsFavor = this.goalsFavor(match);
    const goalsOwn = this.goalsOwn(match);
    return goalsFavor - goalsOwn;
  }

  private totalPoints(match: IMatches) {
    const totalVictories = this.totalVictories(match);
    const totalDraws = this.totalDraws(match);
    return ((totalVictories * 3) + (totalDraws * 1));
  }

  private efficiency(match: IMatches) {
    // [P / (J * 3)] * 100;
    const totalPoints = this.totalPoints(match);
    const totalGames = this.totalGames(match);
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }

  private sortLeaderboard() {
    this._leaderboard.sort((a, b) => a.goalsOwn - b.goalsOwn);
    this._leaderboard.sort((a, b) => b.goalsFavor - a.goalsFavor);
    this._leaderboard.sort((a, b) => b.goalsBalance - a.goalsBalance);
    this._leaderboard.sort((a, b) => b.totalVictories - a.totalVictories);
    this._leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
