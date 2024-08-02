import {
  IsArray,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  emergencyContact?: {
    name: string;
    phoneNumber: string;
  };

  @IsOptional()
  @IsArray()
  medicalHistory?: string[];

  @IsOptional()
  @IsArray()
  allergies?: string[];

  @IsOptional()
  @IsArray()
  chronicConditions?: string[];
}
