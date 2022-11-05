import { Router } from 'express';
import TeamsIdController from '../controllers/TeamsIdController';
import SequelizeFindByPkTeams from '../repositories/SequelizeFindByPkTeams';
import TeamsIdService from '../services/TeamsIdService';

const sequelizeFindByPkTeams = new SequelizeFindByPkTeams();
const teamsIdService = new TeamsIdService(sequelizeFindByPkTeams);
const teamsIdController = new TeamsIdController(teamsIdService);

const router = Router();

router.get('/teams/:id', (req, res) => teamsIdController.getId(req, res));

export default router;
