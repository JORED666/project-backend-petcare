import { Router } from 'express';
import { LoginController } from '../controllers/auth/LoginController';
import { RegisterController } from '../controllers/auth/RegisterController';
import { MeController } from '../controllers/auth/MeController';
import { RegistrarPersonalController } from '../controllers/personal/RegistrarPersonalController';
import { ListarPersonalController } from '../controllers/personal/ListarPersonalController';
import { CambiarPasswordController } from '../controllers/personal/CambiarPasswordController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const loginController = new LoginController();
const registerController = new RegisterController();
const meController = new MeController();
const registrarController = new RegistrarPersonalController();
const listarController = new ListarPersonalController();
const cambiarPasswordController = new CambiarPasswordController();

// Auth
router.post('/auth/login', loginController.handle.bind(loginController));
router.post('/auth/register', registerController.handle.bind(registerController));
router.get('/auth/me', authMiddleware, meController.handle.bind(meController));

// Personal
router.post('/personal/registrar', authMiddleware, registrarController.handle.bind(registrarController));
router.get('/personal/listar', authMiddleware, listarController.handle.bind(listarController));
router.put('/personal/cambiar-password', authMiddleware, cambiarPasswordController.handle.bind(cambiarPasswordController));

export default router;