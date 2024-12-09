import { IUserRepository } from '../interfaces/IUserRepository';
import { UserModel } from '../users.model';
import { User } from '../entities/User';

export class UsersRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);

    return this.mapToDomainModel(createdUser);
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();

    return users.map((user) => this.mapToDomainModel(user));
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);

    if (!user) {
      return null;
    }

    return this.mapToDomainModel(user);
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });

    if (!updatedUser) {
      return null;
    }

    return this.mapToDomainModel(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);

    return Boolean(result);
  }

  private mapToDomainModel(userModel: any): User {
    return new User(
      userModel._id.toString(),
      userModel.fullName,
      userModel.email,
      userModel.password,
      userModel.passwordConfirm,
      userModel.role
    );
  }
}
