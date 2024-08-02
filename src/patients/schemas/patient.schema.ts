import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EmergencyContact } from './emergency-contact.schema';

@Schema()
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: EmergencyContact, required: true })
  emergencyContact: EmergencyContact;

  @Prop({ type: [String] })
  medicalHistory: string[];

  @Prop({ type: [String] })
  allergies: string[];

  @Prop({ type: [String] })
  chronicConditions: string[];
}

export type PatientDocument = Patient & Document;
export const PatientSchema = SchemaFactory.createForClass(Patient);
