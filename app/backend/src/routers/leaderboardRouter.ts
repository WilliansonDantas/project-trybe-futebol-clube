import { Router } from 'express';
import LeaderboardHomeController from '../controllers/LeaderboardHomeController';
import LeaderboardHomeService from '../services/LeaderboardHomeService';
import SequelizeFindAllMatches from '../repositories/SequelizeFindAllMatches';

const sequelizeFindAllMatches = new SequelizeFindAllMatches();
const leaderboardHomeService = new LeaderboardHomeService(sequelizeFindAllMatches);
const leaderboardHomeController = new LeaderboardHomeController(leaderboardHomeService);

const router = Router();

router.get('/leaderboard/home', (req, res) => leaderboardHomeController.objTable(req, res));

export default router;
