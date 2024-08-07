import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Role } from '../../users/enums/role';
import { Specialty, Title } from '../enums';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Specialty)
  specialty: Specialty;

  @IsEnum(Title)
  title: Title;

  @IsNumber()
  yearsOfExperience: number;

  @IsEnum(Role)
  role: Role = Role.PATIENT;
}
