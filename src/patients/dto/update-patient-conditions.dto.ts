import { IsOptional, IsString } from 'class-validator';

export class UpdatePatientConditionsDto {
  @IsOptional()
  @IsString({ each: true })
  medicalHistory?: string[];

  @IsOptional()
  @IsString({ each: true })
  allergies?: string[];

  @IsOptional()
  @IsString({ each: true })
  chronicConditions?: string[];
}
