import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();

const router = Router();

router.post('/login', (req, res) => loginController.login(req, res));

export default router;
