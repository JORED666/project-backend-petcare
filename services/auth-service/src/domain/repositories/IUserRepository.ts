import { Employee } from '../entities/Employee';
import { Client } from '../entities/Client';

export interface IUserRepository {
  findByEmail(email: string): Promise<Employee | Client | null>;
  findById(id: number): Promise<Employee | Client | null>;
  create(user: Omit<Client, 'id' | 'id_cliente'>): Promise<Client>;
  updatePassword(id: number, password: string): Promise<void>;
  delete(id: number): Promise<void>;
}