import { Router } from 'express';
import LoginValidateController from '../controllers/LoginValidateController';

const loginValidateController = new LoginValidateController();

const router = Router();

router.get('/login/validate', (req, res) => loginValidateController.role(req, res));

export default router;
