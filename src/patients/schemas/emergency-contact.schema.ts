import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EmergencyContact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: string;
}

export type EmergencyContactDocument = EmergencyContact & Document;
export const EmergencyContactSchema =
  SchemaFactory.createForClass(EmergencyContact);
