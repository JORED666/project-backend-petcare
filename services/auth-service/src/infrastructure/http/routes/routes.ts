import { Router } from 'express';
import { LoginController } from '../controllers/auth/LoginController';
import { RegisterController } from '../controllers/auth/RegisterController';
import { MeController } from '../controllers/auth/MeController';
import { RegisterVeterinarioController } from '../controllers/personal/RegisterVeterinarioController';
import { ListarVeterinariosController } from '../controllers/personal/ListarVeterinariosController';
import { CambiarPasswordController } from '../controllers/personal/CambiarPasswordController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const loginController = new LoginController();
const registerController = new RegisterController();
const meController = new MeController();
const registerVeterinarioController = new RegisterVeterinarioController();
const listarVeterinariosController = new ListarVeterinariosController();
const cambiarPasswordController = new CambiarPasswordController();

router.post('/auth/login', loginController.handle.bind(loginController));
router.post('/auth/register', registerController.handle.bind(registerController));
router.get('/auth/me', authMiddleware, meController.handle.bind(meController));

router.post('/veterinarios/registrar', authMiddleware, registerVeterinarioController.handle.bind(registerVeterinarioController));
router.get('/veterinarios/listar', authMiddleware, listarVeterinariosController.handle.bind(listarVeterinariosController));
router.put('/veterinarios/cambiar-password', authMiddleware, cambiarPasswordController.handle.bind(cambiarPasswordController));

export default router;