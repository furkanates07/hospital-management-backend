import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../users/enums/role';
import { EmergencyContact } from '../schemas/emergency-contact.schema';

@Schema()
export class Patient extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.PATIENT })
  role: Role;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: false })
  dateOfBirth?: Date;

  @Prop({ required: true })
  gender?: string;

  @Prop({ required: true })
  address?: string;

  @Prop({ type: [EmergencyContact], required: false })
  emergencyContact?: EmergencyContact[];

  @Prop({ type: [String], required: false })
  medicalHistory?: string[];

  @Prop({ type: [String], required: false })
  allergies?: string[];

  @Prop({ type: [String], required: false })
  chronicConditions?: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
export type PatientDocument = Patient & Document;
