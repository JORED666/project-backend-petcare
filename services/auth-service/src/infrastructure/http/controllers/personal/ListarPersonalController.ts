import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { personal } from '../../../db/drizzle/personal.schema';
import { ne } from 'drizzle-orm';

export class ListarPersonalController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.rol !== 'ADMIN') {
        return res.status(403).json({ success: false, error: 'Solo administradores pueden ver el personal' });
      }

      const todo = await db.select().from(personal).where(ne(personal.id_rol, 1));

      return res.json({
        success: true,
        data: todo.map(p => ({
          id: p.id_personal,
          nombre: p.nombre,
          apellido: p.apellido,
          email: p.email,
          telefono: p.telefono,
          rol: p.id_rol === 2 ? 'VETERINARIO' : 'RECEPCIONISTA',
          activo: p.activo,
          password_temporal: p.password_temporal
        }))
      });
    } catch (error) {
      next(error);
    }
  }
}