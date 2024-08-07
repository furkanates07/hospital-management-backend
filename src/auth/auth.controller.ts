import { Body, Controller, Post } from '@nestjs/common';
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
  async register(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Post('doctor-register')
  async registerDoctor(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
