import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { Specialty, Title } from '../enums';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Specialty)
  specialty: Specialty;

  @IsEnum(Title)
  title: Title;

  @IsNumber()
  @Min(0)
  yearsOfExperience: number;
}
