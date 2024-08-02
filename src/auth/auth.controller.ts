import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePatientDto } from 'src/patients/dto';
import { PatientsService } from 'src/patients/patients.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private patientsService: PatientsService,
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
    if (user.role !== 'doctor') {
      throw new Error('Only doctors can register patients');
    }
    return this.patientsService.createPatient(createPatientDto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
