export enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserDto {
  id?: string;

  fullName: string;
  email: string;
  role: RoleEnum;

  createdAt?: Date;
  updatedAt?: Date;
}
