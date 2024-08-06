import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EmergencyContact } from './emergency-contact.schema';

@Schema()
export class Patient extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

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

export const PatientSchema = SchemaFactory.createForClass(Patient);
export type PatientDocument = Patient & Document;
