import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from '../doctors/schemas/doctor.schema';
import { Patient } from '../patients/schemas/patient.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Status } from './enums';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Doctor.name)
    private doctorModel: Model<Doctor>,
    @InjectModel(Patient.name)
    private patientModel: Model<Patient>,
  ) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { patientId, doctorId, appointmentDate } = createAppointmentDto;

    const doctor = await this.doctorModel.findById(doctorId).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    const patient = await this.patientModel.findById(patientId).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    const existingAppointment = await this.appointmentModel
      .findOne({
        doctorId,
        appointmentDate,
      })
      .exec();

    if (existingAppointment) {
      throw new BadRequestException('Doctor is not available at this time.');
    }

    const appointment = new this.appointmentModel(createAppointmentDto);
    appointment.status = Status.PENDING;
    return appointment.save();
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async getAppointmentsByDoctorId(doctorId: string): Promise<Appointment[]> {
    const appointments = await this.appointmentModel.find({ doctorId }).exec();
    if (!appointments || appointments.length === 0) {
      throw new NotFoundException(
        `No appointments found for doctor with ID ${doctorId}`,
      );
    }
    return appointments;
  }

  async getAppointmentsByPatientId(patientId: string): Promise<Appointment[]> {
    const appointments = await this.appointmentModel.find({ patientId }).exec();
    if (!appointments || appointments.length === 0) {
      throw new NotFoundException(
        `No appointments found for patient with ID ${patientId}`,
      );
    }
    return appointments;
  }

  async getAppointmentById(appointmentId: string): Promise<Appointment> {
    const appointment = await this.appointmentModel
      .findById(appointmentId)
      .exec();
    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }
    return appointment;
  }

  async approveAppointment(appointmentId: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status: Status.APPROVED },
      { new: true },
    );

    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }

    return appointment;
  }

  async rejectAppointment(appointmentId: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status: Status.REJECTED },
      { new: true },
    );

    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }

    return appointment;
  }
}