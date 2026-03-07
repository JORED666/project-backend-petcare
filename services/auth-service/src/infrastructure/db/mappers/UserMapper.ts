import { Cliente } from '../drizzle/clientes.schema';
import { Personal } from '../drizzle/personal.schema';
import { Client } from '../../../domain/entities/Client';
import { Employee } from '../../../domain/entities/Employee';
import { Role } from '../../../domain/entities/Role';

const resolveRole = (idRol: number): Role => {
  switch (idRol) {
    case 1: return Role.ADMIN;
    case 2: return Role.VETERINARIO;
    default: return Role.RECEPCIONISTA;
  }
};

export class UserMapper {
  static toClientDomain(row: Cliente): Client {
    return {
      id: row.id_cliente,
      id_cliente: row.id_cliente,
      nombre: row.nombre,
      apellido: row.apellido,
      email: row.email,
      password: row.password_hash ?? '',
      rol: Role.CLIENTE,
      telefono: row.telefono,
      direccion: row.direccion,
      activo: row.activo ?? true
    };
  }

  static toEmployeeDomain(row: Personal): Employee {
    return {
      id: row.id_personal,
      id_personal: row.id_personal,
      id_rol: row.id_rol,
      nombre: row.nombre,
      apellido: row.apellido,
      email: row.email,
      password: row.password_hash ?? '',
      rol: resolveRole(row.id_rol),
      telefono: row.telefono,
      cedula_profesional: row.cedula_profesional,
      especialidad: row.especialidad,
      activo: row.activo ?? true
    };
  }
}