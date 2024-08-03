import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { CreateDoctorDto } from 'src/doctors/dto';
import { CreatePatientDto } from 'src/patients/dto';
import { PatientsService } from 'src/patients/patients.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Role } from './enums/role';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('register-patient')
  @UseGuards(JwtAuthGuard)
  async registerPatient(
    @Body() createPatientDto: CreatePatientDto,
    @Req() req: any,
  ) {
    const user = req.user;
    if (user.role !== Role.DOCTOR) {
      throw new Error('Only doctors can register patients');
    }
    return this.patientsService.createPatient(createPatientDto);
  }

  @Post('register-doctor')
  @UseGuards(JwtAuthGuard)
  async registerDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
    @Req() req: any,
  ) {
    const user = req.user;
    if (user.role !== Role.ADMIN) {
      throw new Error('Only admins can register doctors');
    }
    return this.doctorsService.createDoctor(createDoctorDto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
