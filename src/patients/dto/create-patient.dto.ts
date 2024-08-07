import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Role } from '../../users/enums/role';
import { EmergencyContact } from '../schemas/emergency-contact.schema';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role = Role.PATIENT;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsNotEmpty()
  emergencyContact?: EmergencyContact;

  @IsOptional()
  @IsString({ each: true })
  medicalHistory?: string[];

  @IsOptional()
  @IsString({ each: true })
  allergies?: string[];

  @IsOptional()
  @IsString({ each: true })
  chronicConditions?: string[];
}
