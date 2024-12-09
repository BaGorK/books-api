import { RoleEnum, UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from './users.repository';

export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(userDto: UserDto): Promise<User> {
    const user = new User(
      userDto.id || '',
      userDto.fullName,
      userDto.email,
      userDto.password,
      userDto.passwordConfirm,
      userDto.role || RoleEnum.USER
    );

    const newUser = await this.userRepository.create(user);
    return newUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async update(id: string, user: Partial<UserDto>): Promise<User | null> {
    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const isDeleted = await this.userRepository.delete(id);
    return isDeleted;
  }
}
