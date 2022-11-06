import MatchesService from './MatchesService';
import SequelizeFindAllMatches from '../repositories/SequelizeFindAllMatches';
import IMatches from '../interfaces/IMatches';
import ILeaderboardHome from '../interfaces/ILeaderboardHome';

const sequelizeFindAllMatches = new SequelizeFindAllMatches();
const matchesService = new MatchesService(sequelizeFindAllMatches);

export default class LeaderboardHomeService {
  private _matchers: IMatches[];
  private _leaderboard: ILeaderboardHome[] = [];

  async main() {
    await this.findAll();
    this.filter();
    this.arrayIMatches();
    this.duplicateReduce();
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
    const leaderboardHome = {
      name: match.teamHome?.teamName,
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
    this._leaderboard.push(leaderboardHome);
  }

  private arrayIMatches() {
    this._matchers.forEach((match) => this.objLeaderboard(match));
  }

  private duplicateReduce() {
    const itemRepeat = this._leaderboard
      .reduce((acc: ILeaderboardHome[], item: ILeaderboardHome) => {
        const acum = acc;
        if (!acum.some((leaderboard: ILeaderboardHome) => leaderboard.name === item.name)) {
          acum.push(item);
        }
        return acum;
      }, []);
    this._leaderboard = itemRepeat;
  }

  private totalGames(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.homeTeam === match.homeTeam) {
        acumulator += 1;
      }
    });
    return acumulator;
  }

  private totalVictories(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.homeTeam === match.homeTeam && matcher.homeTeamGoals > matcher.awayTeamGoals) {
        acumulator += 1;
      }
    });
    return acumulator;
  }

  private totalDraws(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.homeTeam === match.homeTeam && matcher.homeTeamGoals === matcher.awayTeamGoals) {
        acumulator += 1;
      }
    });
    return acumulator;
  }

  private totalLosses(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.homeTeam === match.homeTeam && matcher.homeTeamGoals < matcher.awayTeamGoals) {
        acumulator += 1;
      }
    });
    return acumulator;
  }

  private goalsFavor(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.homeTeam === match.homeTeam) {
        acumulator += matcher.homeTeamGoals;
      }
    });
    return acumulator;
  }

  private goalsOwn(match: IMatches) {
    let acumulator = 0;
    this._matchers.forEach((matcher) => {
      if (matcher.homeTeam === match.homeTeam) {
        acumulator += matcher.awayTeamGoals;
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
    this._leaderboard = this._leaderboard.sort((a, b) => a.goalsOwn - b.goalsOwn);
    this._leaderboard = this._leaderboard.sort((a, b) => b.goalsFavor - a.goalsFavor);
    this._leaderboard = this._leaderboard.sort((a, b) => b.goalsBalance - a.goalsBalance);
    this._leaderboard = this._leaderboard.sort((a, b) => b.totalVictories - a.totalVictories);
    this._leaderboard = this._leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
