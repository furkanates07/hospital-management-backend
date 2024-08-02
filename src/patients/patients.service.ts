import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient = new this.patientModel(createPatientDto);
    return newPatient.save();
  }

  async updatePatient(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientModel.findByIdAndUpdate(id, updatePatientDto, {
      new: true,
    });
  }

  async findAllPatients(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }

  async findPatientById(id: string): Promise<Patient> {
    return this.patientModel.findById(id).exec();
  }

  async deletePatient(id: string): Promise<Patient> {
    return this.patientModel.findByIdAndDelete(id).exec();
  }
}
