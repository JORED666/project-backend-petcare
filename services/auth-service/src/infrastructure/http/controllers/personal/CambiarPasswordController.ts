import { Request, Response, NextFunction } from 'express';
import { ChangePasswordUseCase } from '../../../../application/use-cases/ChangePasswordUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';

const changePasswordUseCase = new ChangePasswordUseCase(new UserRepository());

export class CambiarPasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await changePasswordUseCase.execute(req.user?.id, req.body);
      res.json({ success: true, message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      next(error);
    }
  }
}