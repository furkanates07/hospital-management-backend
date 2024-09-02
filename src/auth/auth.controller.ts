import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { CreateDoctorDto } from 'src/doctors/dto';
import { CreatePatientDto } from 'src/patients/dto';
import { PatientsService } from 'src/patients/patients.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
  ) {}

  @Post('patient-register')
  async registerPatient(@Body() dto: CreatePatientDto) {
    try {
      return await this.patientsService.create(dto);
    } catch (error) {
      console.error('Error during patient registration:', error);
      throw new InternalServerErrorException('Failed to register patient');
    }
  }

  @Post('doctor-register')
  async registerDoctor(@Body() dto: CreateDoctorDto) {
    try {
      return await this.doctorsService.create(dto);
    } catch (error) {
      console.error('Error during doctor registration:', error);
      throw new InternalServerErrorException('Failed to register doctor');
    }
  }

  @Post('patient-login')
  async loginPatient(@Body() dto: LoginDto) {
    try {
      return await this.authService.loginPatient(dto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error during patient login:', error);
      throw new InternalServerErrorException('Failed to login patient');
    }
  }

  @Post('doctor-login')
  async loginDoctor(@Body() dto: LoginDto) {
    try {
      return await this.authService.loginDoctor(dto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error during doctor login:', error);
      throw new InternalServerErrorException('Failed to login doctor');
    }
  }
}
