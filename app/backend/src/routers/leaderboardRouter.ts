import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const router = Router();

router.get('/leaderboard', (req, res) => leaderboardController.objTable(req, res));

export default router;
