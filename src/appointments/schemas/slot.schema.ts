import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Hours } from '../enums';

@Schema()
export class Slot {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  hour: Hours;
}

export type SlotDocument = Slot & Document;
export const SlotDocument = SchemaFactory.createForClass(Slot);
