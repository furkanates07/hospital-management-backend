import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreatePatientDto,
  UpdatePatientConditionsDto,
  UpdatePatientDetailsDto,
} from './dto';
import { Patient, PatientDocument } from './schemas/patient.schema';
@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new this.patientModel(createPatientDto);
    return patient.save();
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async updateDetails(
    id: string,
    updatePatientDto: UpdatePatientDetailsDto,
  ): Promise<Patient> {
    const updatedPatient = await this.patientModel.findByIdAndUpdate(
      id,
      updatePatientDto,
      { new: true },
    );
    if (!updatedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return updatedPatient;
  }

  async updatePatientConditions(
    patientId: string,
    updatePatientConditionsDto: UpdatePatientConditionsDto,
  ): Promise<Patient> {
    const patient = await this.patientModel.findById(patientId).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    if (updatePatientConditionsDto.medicalHistory) {
      const newMedicalHistories =
        updatePatientConditionsDto.medicalHistory.filter(
          (history) => !patient.medicalHistory?.includes(history),
        );

      if (newMedicalHistories.length > 0) {
        patient.medicalHistory = [
          ...new Set([
            ...(patient.medicalHistory || []),
            ...newMedicalHistories,
          ]),
        ];
      } else {
        throw new BadRequestException(
          'All provided medical histories already exist.',
        );
      }
    }

    if (updatePatientConditionsDto.allergies) {
      const newAllergies = updatePatientConditionsDto.allergies.filter(
        (allergy) => !patient.allergies?.includes(allergy),
      );

      if (newAllergies.length > 0) {
        patient.allergies = [
          ...new Set([...(patient.allergies || []), ...newAllergies]),
        ];
      } else {
        throw new BadRequestException('All provided allergies already exist.');
      }
    }

    if (updatePatientConditionsDto.chronicConditions) {
      const newChronicConditions =
        updatePatientConditionsDto.chronicConditions.filter(
          (condition) => !patient.chronicConditions?.includes(condition),
        );

      if (newChronicConditions.length > 0) {
        patient.chronicConditions = [
          ...new Set([
            ...(patient.chronicConditions || []),
            ...newChronicConditions,
          ]),
        ];
      } else {
        throw new BadRequestException(
          'All provided chronic conditions already exist.',
        );
      }
    }

    return patient.save();
  }

  async remove(id: string): Promise<Patient> {
    const deletedPatient = await this.patientModel.findByIdAndDelete(id);
    if (!deletedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return deletedPatient;
  }
}
