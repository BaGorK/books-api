import { RoleEnum, UserDto } from './../users/dtos/user.dto';
import { User } from './../users/entities/User';
import { UsersRepository } from './../users/providers/users.repository';

export class AuthService {
  constructor(private usersRepository: UsersRepository) {}
  // signup user
  async signup(userDto: UserDto): Promise<User> {
    const user = new User(
      userDto.id || '',
      userDto.fullName,
      userDto.email,
      userDto.password,
      userDto.passwordConfirm,
      RoleEnum.USER
    );

    return this.usersRepository.create(user);
  }
}
