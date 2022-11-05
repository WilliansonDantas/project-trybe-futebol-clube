import { Router } from 'express';
import MatchesPatchController from '../controllers/MatchesPatchController';
import SequelizePatchMatches from '../repositories/SequelizePatchMatches';
import MatchesPatchService from '../services/MatchesPatchService';

const sequelizePatchMatches = new SequelizePatchMatches();
const matchesPatchService = new MatchesPatchService(sequelizePatchMatches);
const matchesPatchController = new MatchesPatchController(matchesPatchService);

const router = Router();

router.patch('/matches/:id/finish', (req, res) => matchesPatchController.update(req, res));

export default router;
