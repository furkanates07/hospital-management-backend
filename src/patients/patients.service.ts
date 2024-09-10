import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  ChangePasswordDto,
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
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createPatientDto.password,
        saltRounds,
      );

      createPatientDto.password = hashedPassword;

      const patient = new this.patientModel(createPatientDto);
      return await patient.save();
    } catch (error) {
      console.error(
        'An unexpected error occurred during patient creation:',
        error,
      );
      throw new InternalServerErrorException('Failed to create patient');
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientModel.find().exec();
    } catch (error) {
      console.error(
        'An unexpected error occurred while retrieving patients:',
        error,
      );
      throw new InternalServerErrorException('Failed to retrieve patients');
    }
  }

  async findById(id: string): Promise<Patient> {
    try {
      const patient = await this.patientModel.findById(id).exec();
      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      return patient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        'An unexpected error occurred while retrieving patient:',
        error,
      );
      throw new InternalServerErrorException('Failed to retrieve patient');
    }
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<Patient> {
    try {
      const { oldPassword, newPassword } = changePasswordDto;

      const patient = await this.patientModel.findById(id).exec();
      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        patient.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid old password');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      patient.password = hashedPassword;

      return await patient.save();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error(
        'An unexpected error occurred while changing patient password:',
        error,
      );
      throw new InternalServerErrorException('Failed to change password');
    }
  }

  async updateDetails(
    id: string,
    updatePatientDto: UpdatePatientDetailsDto,
  ): Promise<Patient> {
    try {
      const updatedPatient = await this.patientModel.findByIdAndUpdate(
        id,
        updatePatientDto,
        { new: true },
      );
      if (!updatedPatient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      return updatedPatient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        'An unexpected error occurred while updating patient details:',
        error,
      );
      throw new InternalServerErrorException(
        'Failed to update patient details',
      );
    }
  }

  async updatePatientConditions(
    patientId: string,
    updatePatientConditionsDto: UpdatePatientConditionsDto,
  ): Promise<Patient> {
    try {
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
          throw new BadRequestException(
            'All provided allergies already exist.',
          );
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

      return await patient.save();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error(
        'An unexpected error occurred while updating patient conditions:',
        error,
      );
      throw new InternalServerErrorException(
        'Failed to update patient conditions',
      );
    }
  }

  async remove(id: string): Promise<Patient> {
    try {
      const deletedPatient = await this.patientModel.findByIdAndDelete(id);
      if (!deletedPatient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      return deletedPatient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        'An unexpected error occurred while deleting patient:',
        error,
      );
      throw new InternalServerErrorException('Failed to delete patient');
    }
  }
}
