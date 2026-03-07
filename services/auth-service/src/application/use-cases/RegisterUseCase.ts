import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { hashPassword } from '../../infrastructure/utils/bcrypt.util';
import { generateToken } from '../../infrastructure/utils/jwt.util';
import { RegisterRequest } from '../dtos/register/RegisterRequest';
import { RegisterResponse } from '../dtos/register/RegisterResponse';
import { Role } from '../../domain/entities/Role';

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterRequest): Promise<RegisterResponse> {
    const existe = await this.userRepository.findByEmail(dto.email);
    if (existe) {
      throw new Error('El email ya está registrado');
    }

    const password = await hashPassword(dto.password);

    const nuevoCliente = await this.userRepository.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      password,
      rol: Role.CLIENTE,
      telefono: dto.telefono || null,
      activo: true,
      direccion: null
    });

    const token = generateToken({
      id: nuevoCliente.id,
      email: nuevoCliente.email,
      rol: nuevoCliente.rol
    });

    return {
      token,
      user: {
        id: nuevoCliente.id,
        nombre: nuevoCliente.nombre,
        apellido: nuevoCliente.apellido,
        email: nuevoCliente.email,
        rol: nuevoCliente.rol
      }
    };
  }
}