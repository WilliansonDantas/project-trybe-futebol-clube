import { Router } from 'express';
import MatchesPatchIdController from '../controllers/MatchesPatchIdController';
import SequelizePatchIdMatches from '../repositories/SequelizePatchIdMatches';
import MatchesPatchIdService from '../services/MatchesPatchIdService';

const sequelizePatchIdMatches = new SequelizePatchIdMatches();
const matchesPatchIdService = new MatchesPatchIdService(sequelizePatchIdMatches);
const matchesPatchIdController = new MatchesPatchIdController(matchesPatchIdService);

const router = Router();

router.patch('/matches/:id', (req, res) => matchesPatchIdController.update(req, res));

export default router;
