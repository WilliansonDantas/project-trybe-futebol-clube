import { Router } from 'express';
import LeaderboardHomeController from '../controllers/LeaderboardHomeController';
import LeaderboardHomeService from '../services/LeaderboardHomeService';

const leaderboardHomeService = new LeaderboardHomeService();
const leaderboardHomeController = new LeaderboardHomeController(leaderboardHomeService);

const router = Router();

router.get('/leaderboard/home', (req, res) => leaderboardHomeController.objTable(req, res));

export default router;
