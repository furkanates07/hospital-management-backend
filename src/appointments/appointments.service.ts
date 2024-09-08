import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from '../doctors/schemas/doctor.schema';
import { Patient, PatientDocument } from '../patients/schemas/patient.schema';
import { CreateAppointmentDto, UpdatePrescriptionDto } from './dto';
import { Status } from './enums';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { isValidHour, isWeekday } from './validators';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Doctor.name)
    private doctorModel: Model<DoctorDocument>,
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
  ) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { patientId, doctorId, slot } = createAppointmentDto;

    const doctor = await this.doctorModel.findById(doctorId).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    const patient = await this.patientModel.findById(patientId).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    if (!isWeekday(slot.date)) {
      throw new BadRequestException(
        'Appointments can only be scheduled on weekdays.',
      );
    }

    if (!isValidHour(slot.hour)) {
      throw new BadRequestException(
        'Appointments can only be scheduled between 09:00 and 17:00.',
      );
    }

    const existingAppointment = await this.appointmentModel
      .findOne({
        doctorId,
        'slot.date': slot.date,
        'slot.hour': slot.hour,
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

  async cancelAppointment(appointmentId: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status: Status.CANCELED },
      { new: true },
    );

    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }

    return appointment;
  }

  async completeAppointment(appointmentId: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status: Status.COMPLETED },
      { new: true },
    );

    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }

    return appointment;
  }

  async updatePrescription(
    appointmentId: string,
    updatePrescriptionDto: UpdatePrescriptionDto,
  ): Promise<Appointment> {
    const { prescription } = updatePrescriptionDto;
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      { prescription },
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
