import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import SequelizeFindAllMatches from '../repositories/SequelizeFindAllMatches';
import MatchesService from '../services/MatchesService';

const sequelizeFindAllMatches = new SequelizeFindAllMatches();
const matchesService = new MatchesService(sequelizeFindAllMatches);
const matchesController = new MatchesController(matchesService);

const router = Router();

router.get('/matches', (req, res) => matchesController.getAll(req, res));

export default router;
