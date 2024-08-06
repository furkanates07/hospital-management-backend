import { IsDate, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { EmergencyContact } from '../schemas/emergency-contact.schema';

export class UpdatePatientDto {
  @IsOptional()
  @IsPhoneNumber()
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
