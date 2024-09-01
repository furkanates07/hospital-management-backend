import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../users/enums/role';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdatePrescriptionDto } from './dto';
import { Appointment } from './schemas/appointment.schema';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: any,
  ): Promise<Appointment> {
    const user = req.user;
    if (user.role !== Role.PATIENT) {
      throw new BadRequestException('Only patients can create appointments.');
    }
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentsService.getAllAppointments();
  }

  @Get('doctor/:doctorId')
  @UseGuards(JwtAuthGuard)
  async getAppointmentsByDoctorId(
    @Param('doctorId') doctorId: string,
  ): Promise<Appointment[]> {
    return this.appointmentsService.getAppointmentsByDoctorId(doctorId);
  }

  @Get('patient/:patientId')
  @UseGuards(JwtAuthGuard)
  async getAppointmentsByPatientId(
    @Param('patientId') patientId: string,
  ): Promise<Appointment[]> {
    return this.appointmentsService.getAppointmentsByPatientId(patientId);
  }

  @Get(':appointmentId')
  @UseGuards(JwtAuthGuard)
  async getAppointmentById(
    @Param('appointmentId') appointmentId: string,
  ): Promise<Appointment> {
    return this.appointmentsService.getAppointmentById(appointmentId);
  }

  @Post(':appointmentId/approve')
  @UseGuards(JwtAuthGuard)
  async approveAppointment(
    @Param('appointmentId') appointmentId: string,
    @Req() req: any,
  ): Promise<Appointment> {
    const user = req.user;
    if (user.role !== Role.DOCTOR) {
      throw new BadRequestException('Only doctors can approve appointments.');
    }
    return this.appointmentsService.approveAppointment(appointmentId);
  }

  @Post(':appointmentId/reject')
  @UseGuards(JwtAuthGuard)
  async rejectAppointment(
    @Param('appointmentId') appointmentId: string,
    @Req() req: any,
  ): Promise<Appointment> {
    const user = req.user;
    if (user.role !== Role.DOCTOR) {
      throw new BadRequestException('Only doctors can reject appointments.');
    }
    return this.appointmentsService.rejectAppointment(appointmentId);
  }

  @Post(':appointmentId/cancel')
  @UseGuards(JwtAuthGuard)
  async cancelAppointment(
    @Param('appointmentId') appointmentId: string,
    @Req() req: any,
  ): Promise<Appointment> {
    const user = req.user;
    if (user.role !== Role.PATIENT) {
      throw new BadRequestException('Only patients can cancel appointments.');
    }
    return this.appointmentsService.cancelAppointment(appointmentId);
  }

  @Patch(':appointmentId/prescription')
  @UseGuards(JwtAuthGuard)
  async updatePrescription(
    @Param('appointmentId') appointmentId: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
    @Req() req: any,
  ): Promise<Appointment> {
    const user = req.user;
    if (user.role !== Role.DOCTOR) {
      throw new BadRequestException('Only doctors can update prescriptions.');
    }

    return this.appointmentsService.updatePrescription(
      appointmentId,
      updatePrescriptionDto,
    );
  }
}
