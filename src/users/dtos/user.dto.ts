export enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserDto {
  id?: string;

  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: RoleEnum;

  createdAt?: Date;
  updatedAt?: Date;
}
