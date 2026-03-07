import { User } from './User';

export interface Client extends User {
  id_cliente: number;
  telefono?: string | null;
  direccion?: string | null;
  activo: boolean;
}