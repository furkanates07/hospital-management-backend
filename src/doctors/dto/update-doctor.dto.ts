import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Specialty, Title } from '../enums';

export class UpdateDoctorDto {
  @IsOptional()
  @IsEnum(Specialty)
  specialty?: Specialty;

  @IsOptional()
  @IsEnum(Title)
  title?: Title;

  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;
}
