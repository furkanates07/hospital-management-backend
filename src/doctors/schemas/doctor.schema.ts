import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../users/enums/role';
import { Speciality, Title } from '../enums';

@Schema()
export class Doctor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.DOCTOR })
  role: Role;

  @Prop({ required: true })
  speciality: Speciality;

  @Prop({ required: true, enum: Title })
  title: Title;

  @Prop({ required: true })
  yearsOfExperience: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
export type DoctorDocument = Doctor & Document;
