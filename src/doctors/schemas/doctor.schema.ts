import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Specialty, Title } from '../enums';

@Schema()
export class Doctor extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  specialty: Specialty;

  @Prop({ required: true, enum: Title })
  title: Title;

  @Prop({ required: true })
  yearsOfExperience: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
export type DoctorDocument = Doctor & Document;
