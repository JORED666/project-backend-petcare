import { Router } from 'express';
import { RegistrarPersonalController } from '../controllers/personal/RegistrarPersonalController';
import { ListarPersonalController } from '../controllers/personal/ListarPersonalController';
import { CambiarPasswordController } from '../controllers/personal/CambiarPasswordController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const registrarController = new RegistrarPersonalController();
const listarController = new ListarPersonalController();
const cambiarPasswordController = new CambiarPasswordController();

router.use(authMiddleware);

router.post('/registrar', registrarController.handle.bind(registrarController));
router.get('/listar', listarController.handle.bind(listarController));
router.put('/cambiar-password', cambiarPasswordController.handle.bind(cambiarPasswordController));

export default router;