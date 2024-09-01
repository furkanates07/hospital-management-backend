import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePrescriptionDto {
  @IsString()
  @IsNotEmpty()
  prescription: string;
}
