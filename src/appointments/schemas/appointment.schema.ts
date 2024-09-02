import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from '../enums/status.enum';
import { Slot } from './slot.schema';

@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  patientId: string;

  @Prop({ required: true })
  doctorId: string;

  @Prop({ type: Slot, required: true })
  slot: Slot;

  @Prop({ required: true, enum: Status, default: Status.PENDING })
  status: Status;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: false })
  prescription?: string;
}

export type AppointmentDocument = Appointment & Document;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
