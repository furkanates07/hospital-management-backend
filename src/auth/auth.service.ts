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

  async loginPatient(dto: LoginDto): Promise<{ access_token: string }> {
    const patient = await this.patientModel.findOne({ email: dto.email });

    if (!patient) {
      throw new UnauthorizedException('No patient found with this email.');
    }

    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      patient.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const payload = {
      email: patient.email,
      role: 'PATIENT',
      userId: patient._id.toString(),
    };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async loginDoctor(dto: LoginDto): Promise<{ access_token: string }> {
    const doctor = await this.doctorModel.findOne({ email: dto.email });

    if (!doctor) {
      throw new UnauthorizedException('No doctor found with this email.');
    }

    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      doctor.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const payload = {
      email: doctor.email,
      role: 'DOCTOR',
      userId: doctor._id.toString(),
    };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
