import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from '../../users/enums/role';
import { Speciality, Title } from '../enums';

export class UpdateDoctorDto {
  @IsOptional()
  @IsEnum(Speciality)
  speciality?: Speciality;

  @IsOptional()
  @IsEnum(Title)
  title?: Title;

  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
