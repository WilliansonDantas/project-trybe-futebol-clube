import { Router } from 'express';
import LeaderboardAwayController from '../controllers/LeaderboardAwayController';
import LeaderboardAwayService from '../services/LeaderboardAwayService';

const leaderboardAwayService = new LeaderboardAwayService();
const leaderboardAwayController = new LeaderboardAwayController(leaderboardAwayService);

const router = Router();

router.get('/leaderboard/away', (req, res) => leaderboardAwayController.objTable(req, res));

export default router;
