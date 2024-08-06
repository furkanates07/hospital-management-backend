import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { CreateDoctorDto } from 'src/doctors/dto';
import { CreatePatientDto } from 'src/patients/dto';
import { PatientsService } from 'src/patients/patients.service';
import { Role } from '../users/enums/role';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('register-patient')
  @UseGuards(JwtAuthGuard)
  async registerPatient(
    @Body() createPatientDto: CreatePatientDto,
    @Req() req: any,
  ) {
    const user = req.user;

    if (user.role !== Role.DOCTOR && user.role !== Role.ADMIN) {
      throw new HttpException(
        'Only doctors and admins can register patients',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.patientsService.create(createPatientDto);
  }

  @Post('register-doctor')
  @UseGuards(JwtAuthGuard)
  async registerDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
    @Req() req: any,
  ) {
    const user = req.user;
    if (user.role !== Role.ADMIN) {
      throw new HttpException(
        'Only admins can register doctors',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.doctorsService.create(createDoctorDto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
