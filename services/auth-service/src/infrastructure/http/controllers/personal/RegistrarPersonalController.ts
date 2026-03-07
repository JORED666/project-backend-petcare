import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { personal } from '../../../db/drizzle/personal.schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../../../utils/bcrypt.util';
import crypto from 'crypto';

export class RegistrarPersonalController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.rol !== 'ADMIN') {
        return res.status(403).json({ success: false, error: 'Solo administradores pueden registrar personal' });
      }

      const { nombre, apellido, email, telefono, id_rol } = req.body;

      if (!nombre || !apellido || !email || !id_rol) {
        return res.status(400).json({ success: false, error: 'Nombre, apellido, email y rol son requeridos' });
      }

      if (id_rol === 1) {
        return res.status(403).json({ success: false, error: 'No se puede crear otro administrador' });
      }

      const [existente] = await db.select().from(personal).where(eq(personal.email, email)).limit(1);
      if (existente) {
        return res.status(400).json({ success: false, error: 'Este email ya está registrado' });
      }

      const passwordTemporal = crypto.randomBytes(8).toString('hex');
      const passwordHash = await hashPassword(passwordTemporal);

      const [nuevoPersonal] = await db.insert(personal).values({
        id_rol, nombre, apellido, email,
        telefono: telefono || null,
        cedula_profesional: null,
        especialidad: null,
        password_hash: passwordHash,
        password_temporal: true,
        activo: true
      }).returning();

      return res.json({
        success: true,
        message: 'Personal registrado exitosamente',
        data: {
          id: nuevoPersonal.id_personal,
          nombre: nuevoPersonal.nombre,
          apellido: nuevoPersonal.apellido,
          email: nuevoPersonal.email,
          rol: id_rol === 2 ? 'VETERINARIO' : 'RECEPCIONISTA',
          password_temporal: passwordTemporal
        }
      });
    } catch (error) {
      next(error);
    }
  }
}