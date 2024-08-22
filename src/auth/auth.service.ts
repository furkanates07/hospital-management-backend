import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/doctors/schemas/doctor.schema';
import { Patient, PatientDocument } from 'src/patients/schemas/patient.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    let user = await this.patientModel.findOne({ email: dto.email });

    if (!user) {
      user = await this.doctorModel.findOne({ email: dto.email });
    }

    if (!user) {
      throw new UnauthorizedException('No user found with this email.');
    }

    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const payload = { email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
