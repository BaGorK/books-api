import { RoleEnum } from '../dtos/user.dto';

export class User {
  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public password: string,
    public passwordConfirm: string,
    public role: RoleEnum
  ) {}
}
