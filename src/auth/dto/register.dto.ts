import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums/role';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role;
}
