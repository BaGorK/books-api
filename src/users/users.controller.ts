import { Request, Response } from 'express';
import { RoleEnum, UserDto } from './dtos/user.dto';
import { UsersService } from './providers/users.service';

export class UsersController {
  constructor(private usersService: UsersService) {}

  async createUser(req: Request, res: Response): Promise<void> {
    console.log('creating user...');

    try {
      const userDto: UserDto = req.body;

      this.validateCreateUserDto(userDto);

      const user = await this.usersService.create(userDto);

      res.status(201).json(user);
    } catch (error) {
      console.log('Error creating user:', error);
      res.status(500).json({
        message: 'Error creating user',
        error: (error as Error).message,
      });
    }
  }

  // get all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    console.log('Fetching Users...');
    try {
      const users = await this.usersService.findAll();

      res.status(200).json(users);
    } catch (error) {
      console.log('Error fetching users:', error);
      res.status(500).json({
        message: 'Error fetching users',
        error: (error as Error).message,
      });
    }
  }

  // get user by id
  async getUser(req: Request, res: Response): Promise<void> {
    console.log('Fetching User...');
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          message: 'Please provide a user id',
        });
        return;
      }

      const user = await this.usersService.findById(id);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      res.status(500).json({
        message: 'Error fetching user',
        error: (error as Error).message,
      });
    }
  }

  // update user
  async updateUser(req: Request, res: Response): Promise<void> {
    console.log('Updating User...');
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          message: 'Please provide a user id',
        });
        return;
      }

      const userDto: Partial<UserDto> = req.body;

      const updatedUser = await this.usersService.update(id, userDto);

      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (error) {
      console.log('Error updating user:', error);
      res.status(500).json({
        message: 'Error updating user',
        error: (error as Error).message,
      });
    }
  }

  // delete user
  async deleteUser(req: Request, res: Response): Promise<void> {
    console.log('Deleting User...');
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          message: 'Please provide a user id',
        });
        return;
      }

      const isDeleted = await this.usersService.delete(id);

      if (isDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (error) {
      console.log('Error deleting user:', error);
      res.status(500).json({
        message: 'Error deleting user',
        error: (error as Error).message,
      });
    }
  }

  // validation
  private validateCreateUserDto(userDto: UserDto): void {
    if (!userDto.email) {
      throw new Error('Please provide an email');
    }

    if (!userDto.fullName) {
      throw new Error('Please provide a fullName');
    }

    if (userDto.role && !Object.values(RoleEnum).includes(userDto.role)) {
      throw new Error('Invalid role');
    }

    if (!userDto.password) {
      throw new Error('Please provide a password');
    }

    if (!userDto.passwordConfirm) {
      throw new Error('Please provide a password confirmation');
    }

    if (userDto.password !== userDto.passwordConfirm) {
      throw new Error('Passwords do not match');
    }
  }
}
