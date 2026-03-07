import { User } from './User';

export interface Employee extends User {
  id_personal: number;
  id_rol: number;
  telefono?: string | null;
  cedula_profesional?: string | null;
  especialidad?: string | null;
  activo: boolean;
}