import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Specialty, Title } from '../enums';

@Schema()
export class Doctor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Specialty })
  specialty: Specialty;

  @Prop({ required: true, enum: Title })
  title: Title;

  @Prop({ required: true })
  yearsOfExperience: number;
}

export type DoctorDocument = Doctor & Document;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
