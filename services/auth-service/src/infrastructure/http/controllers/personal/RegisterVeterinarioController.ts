import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { veterinarios } from '../../../db/drizzle/veterinarios.schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../../../utils/bcrypt.util';

export class RegisterVeterinarioController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.rol !== 'ADMIN') {
        return res.status(403).json({ success: false, error: 'Solo administradores pueden registrar veterinarios' });
      }

      const { nombre, apellido, email, password, telefono, cedula_profesional, especialidad } = req.body;

      if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ success: false, error: 'Nombre, apellido, email y password son requeridos' });
      }

      const [existente] = await db.select().from(veterinarios).where(eq(veterinarios.email, email)).limit(1);
      if (existente) {
        return res.status(400).json({ success: false, error: 'Este email ya está registrado' });
      }

      const password_hash = await hashPassword(password);

      const [nuevo] = await db.insert(veterinarios).values({
        id_rol: 2,
        nombre, apellido, email,
        password: password_hash,
        telefono: telefono || null,
        cedula_profesional: cedula_profesional || null,
        especialidad: especialidad || null,
        activo: true
      }).returning();

      return res.status(201).json({
        success: true,
        data: {
          id: nuevo.id_veterinario,
          nombre: nuevo.nombre,
          apellido: nuevo.apellido,
          email: nuevo.email,
          especialidad: nuevo.especialidad
        }
      });
    } catch (error) {
      next(error);
    }
  }
}