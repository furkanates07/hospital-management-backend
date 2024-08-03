import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Specialty, Title } from '../enums';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(Specialty)
  specialty?: Specialty;

  @IsOptional()
  @IsEnum(Title)
  title?: Title;

  @IsOptional()
  @IsNumber()
  @Min(0)
  yearsOfExperience?: number;
}
