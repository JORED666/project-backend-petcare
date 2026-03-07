import { Router } from 'express';
import { LoginController } from '../controllers/auth/LoginController';
import { RegisterController } from '../controllers/auth/RegisterController';
import { MeController } from '../controllers/auth/MeController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const loginController = new LoginController();
const registerController = new RegisterController();
const meController = new MeController();

router.post('/login', loginController.handle.bind(loginController));
router.post('/register', registerController.handle.bind(registerController));
router.get('/me', authMiddleware, meController.handle.bind(meController));

export default router;