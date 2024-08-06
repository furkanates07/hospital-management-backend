import { IsDate, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { EmergencyContact } from '../schemas/emergency-contact.schema';

export class CreatePatientDto {
  @IsNotEmpty()
  userId: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  emergencyContact: EmergencyContact;

  @IsString({ each: true })
  medicalHistory: string[];

  @IsString({ each: true })
  allergies: string[];

  @IsString({ each: true })
  chronicConditions: string[];
}
