import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EmergencyContact } from '../schemas/emergency-contact.schema';

export class UpdatePatientDetailsDto {
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
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  emergencyContact?: EmergencyContact;
}
