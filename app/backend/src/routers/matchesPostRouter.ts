import { Router } from 'express';
import MatchesPostController from '../controllers/MatchesPostController';
import SequelizeCreateMatchesPost from '../repositories/SequelizeCreateMatchesPost';
import MatchesPostService from '../services/MatchesPostService';

const sequelizeCreateMatchesPost = new SequelizeCreateMatchesPost();
const matchesPostService = new MatchesPostService(sequelizeCreateMatchesPost);
const matchesPostController = new MatchesPostController(matchesPostService);

const router = Router();

router.post('/matches', (req, res) => matchesPostController.create(req, res));

export default router;
