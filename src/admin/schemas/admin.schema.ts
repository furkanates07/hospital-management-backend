import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../users/enums/role';

@Schema()
export class Admin extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.ADMIN })
  role: Role;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
export type AdminDocument = Admin & Document;
