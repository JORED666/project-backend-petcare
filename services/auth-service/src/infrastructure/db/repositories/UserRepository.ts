import { eq } from 'drizzle-orm';
import { db } from '../database';
import { clientes } from '../drizzle/clientes.schema';
import { personal } from '../drizzle/personal.schema';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { Client } from '../../../domain/entities/Client';
import { Employee } from '../../../domain/entities/Employee';
import { UserMapper } from '../mappers/UserMapper';
import { Role } from '../../../domain/entities/Role';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<Employee | Client | null> {
    const [empleado] = await db.select().from(personal).where(eq(personal.email, email)).limit(1);
    if (empleado) return UserMapper.toEmployeeDomain(empleado);

    const [cliente] = await db.select().from(clientes).where(eq(clientes.email, email)).limit(1);
    if (cliente) return UserMapper.toClientDomain(cliente);

    return null;
  }

  async findById(id: number): Promise<Employee | Client | null> {
    const [empleado] = await db.select().from(personal).where(eq(personal.id_personal, id)).limit(1);
    if (empleado) return UserMapper.toEmployeeDomain(empleado);

    const [cliente] = await db.select().from(clientes).where(eq(clientes.id_cliente, id)).limit(1);
    if (cliente) return UserMapper.toClientDomain(cliente);

    return null;
  }

  async create(user: Omit<Client, 'id' | 'id_cliente' | 'created_at'>): Promise<Client> {
    const [nuevo] = await db.insert(clientes).values({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      telefono: user.telefono ?? '',
      direccion: user.direccion,
      activo: user.activo
    }).returning();

    return UserMapper.toClientDomain(nuevo);
  }

  async updatePassword(id: number, hash: string): Promise<void> {
    await db.update(personal).set({ password_hash: hash, password_temporal: false })
      .where(eq(personal.id_personal, id));

    await db.update(clientes).set({ password_hash: hash, password_temporal: false })
      .where(eq(clientes.id_cliente, id));
  }

  async delete(id: number): Promise<void> {
    await db.update(personal).set({ activo: false }).where(eq(personal.id_personal, id));
    await db.update(clientes).set({ activo: false }).where(eq(clientes.id_cliente, id));
  }
}