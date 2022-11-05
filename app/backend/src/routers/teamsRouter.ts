import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import SequelizeFindAllTeams from '../repositories/SequelizeFindAllTeams';
import TeamsService from '../services/TeamsService';

const sequelizeFindAllTeams = new SequelizeFindAllTeams();
const teamsService = new TeamsService(sequelizeFindAllTeams);
const teamsController = new TeamsController(teamsService);

const router = Router();

router.get('/teams', (req, res) => teamsController.getAll(req, res));

export default router;
