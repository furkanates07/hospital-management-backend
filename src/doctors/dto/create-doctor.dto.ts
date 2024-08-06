import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Specialty, Title } from '../enums';

export class CreateDoctorDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Specialty)
  specialty: Specialty;

  @IsNotEmpty()
  @IsEnum(Title)
  title: Title;

  @IsNotEmpty()
  @IsNumber()
  yearsOfExperience: number;
}
