import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Role } from '../../users/enums/role';
import { Speciality, Title } from '../enums';

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

  @IsEnum(Speciality)
  @IsNotEmpty()
  specialty: Speciality;

  @IsEnum(Title)
  @IsNotEmpty()
  title: Title;

  @IsNumber()
  @IsNotEmpty()
  yearsOfExperience: number;

  @IsEnum(Role)
  role: Role = Role.PATIENT;
}
