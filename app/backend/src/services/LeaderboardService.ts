import LeaderboardHomeService from './LeaderboardHomeService';
import LeaderboardAwayService from './LeaderboardAwayService';
import ILeaderboard from '../interfaces/ILeaderboard';

const leaderboardAwayService = new LeaderboardAwayService();
const leaderboardHomeService = new LeaderboardHomeService();

export default class LeaderboardService {
  private _leaderboard: ILeaderboard[];
  private _leaderboardAwayService = leaderboardAwayService;
  private _leaderboardHomeService = leaderboardHomeService;

  async main() {
    await this.findAllAway();
    this.sortLeaderboard();
    return this._leaderboard;
  }

  private async findAllAway() {
    const away = await this._leaderboardAwayService.main();
    const home = await this._leaderboardHomeService.main();
    let data: ILeaderboard;
    const arrayCompleted = away.map((teamAway) => {
      home.forEach((teamH) => {
        if (teamH.name === teamAway.name) {
          data = LeaderboardService.sumAll(teamH, teamAway);
        }
      });
      return data;
    });
    this._leaderboard = arrayCompleted;
  }

  private static sumAll(home: ILeaderboard, away: ILeaderboard) {
    const newObj = ({
      name: home.name,
      totalPoints: home.totalPoints + away.totalPoints,
      totalGames: home.totalGames + away.totalGames,
      totalVictories: home.totalVictories + away.totalVictories,
      totalDraws: home.totalDraws + away.totalDraws,
      totalLosses: home.totalLosses + away.totalLosses,
      goalsFavor: home.goalsFavor + away.goalsFavor,
      goalsOwn: home.goalsOwn + away.goalsOwn,
      goalsBalance: home.goalsBalance + away.goalsBalance,
      efficiency: (((home.totalPoints + away.totalPoints)
      / ((home.totalGames + away.totalGames) * 3)) * 100).toFixed(2),
    });
    return newObj;
  }

  private sortLeaderboard() {
    this._leaderboard.sort((a, b) => a.goalsOwn - b.goalsOwn);
    this._leaderboard.sort((a, b) => b.goalsFavor - a.goalsFavor);
    this._leaderboard.sort((a, b) => b.goalsBalance - a.goalsBalance);
    this._leaderboard.sort((a, b) => b.totalVictories - a.totalVictories);
    this._leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
