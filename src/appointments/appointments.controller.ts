import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
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
    try {
      const user = req.user;
      if (user.role !== Role.PATIENT) {
        throw new BadRequestException('Only patients can create appointments.');
      }
      return await this.appointmentsService.createAppointment(
        createAppointmentDto,
      );
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new InternalServerErrorException('Failed to create appointment');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllAppointments(): Promise<Appointment[]> {
    try {
      return await this.appointmentsService.getAllAppointments();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw new InternalServerErrorException('Failed to fetch appointments');
    }
  }

  @Get('doctor/:doctorId')
  @UseGuards(JwtAuthGuard)
  async getAppointmentsByDoctorId(
    @Param('doctorId') doctorId: string,
  ): Promise<Appointment[]> {
    try {
      return await this.appointmentsService.getAppointmentsByDoctorId(doctorId);
    } catch (error) {
      console.error('Error fetching appointments by doctor ID:', error);
      throw new InternalServerErrorException(
        'Failed to fetch appointments by doctor ID',
      );
    }
  }

  @Get('patient/:patientId')
  @UseGuards(JwtAuthGuard)
  async getAppointmentsByPatientId(
    @Param('patientId') patientId: string,
  ): Promise<Appointment[]> {
    try {
      return await this.appointmentsService.getAppointmentsByPatientId(
        patientId,
      );
    } catch (error) {
      console.error('Error fetching appointments by patient ID:', error);
      throw new InternalServerErrorException(
        'Failed to fetch appointments by patient ID',
      );
    }
  }

  @Get(':appointmentId')
  @UseGuards(JwtAuthGuard)
  async getAppointmentById(
    @Param('appointmentId') appointmentId: string,
  ): Promise<Appointment> {
    try {
      return await this.appointmentsService.getAppointmentById(appointmentId);
    } catch (error) {
      console.error('Error fetching appointment by ID:', error);
      throw new InternalServerErrorException(
        'Failed to fetch appointment by ID',
      );
    }
  }

  @Post(':appointmentId/approve')
  @UseGuards(JwtAuthGuard)
  async approveAppointment(
    @Param('appointmentId') appointmentId: string,
    @Req() req: any,
  ): Promise<Appointment> {
    try {
      const user = req.user;
      if (user.role !== Role.DOCTOR) {
        throw new BadRequestException('Only doctors can approve appointments.');
      }
      return await this.appointmentsService.approveAppointment(appointmentId);
    } catch (error) {
      console.error('Error approving appointment:', error);
      throw new InternalServerErrorException('Failed to approve appointment');
    }
  }

  @Post(':appointmentId/reject')
  @UseGuards(JwtAuthGuard)
  async rejectAppointment(
    @Param('appointmentId') appointmentId: string,
    @Req() req: any,
  ): Promise<Appointment> {
    try {
      const user = req.user;
      if (user.role !== Role.DOCTOR) {
        throw new BadRequestException('Only doctors can reject appointments.');
      }
      return await this.appointmentsService.rejectAppointment(appointmentId);
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      throw new InternalServerErrorException('Failed to reject appointment');
    }
  }

  @Post(':appointmentId/cancel')
  @UseGuards(JwtAuthGuard)
  async cancelAppointment(
    @Param('appointmentId') appointmentId: string,
    @Req() req: any,
  ): Promise<Appointment> {
    try {
      const user = req.user;
      if (user.role !== Role.PATIENT) {
        throw new BadRequestException('Only patients can cancel appointments.');
      }
      return await this.appointmentsService.cancelAppointment(appointmentId);
    } catch (error) {
      console.error('Error canceling appointment:', error);
      throw new InternalServerErrorException('Failed to cancel appointment');
    }
  }

  @Post(':appointmentId/complete')
  @UseGuards(JwtAuthGuard)
  async completeAppointment(
    @Param('appointmentId') appointmentId: string,
    @Req() req: any,
  ): Promise<Appointment> {
    try {
      const user = req.user;
      if (user.role !== Role.DOCTOR) {
        throw new BadRequestException(
          'Only doctors can complete appointments.',
        );
      }
      return await this.appointmentsService.completeAppointment(appointmentId);
    } catch (error) {
      console.error('Error completing appointment:', error);
      throw new InternalServerErrorException('Failed to complete appointment');
    }
  }

  @Patch(':appointmentId/prescription')
  @UseGuards(JwtAuthGuard)
  async updatePrescription(
    @Param('appointmentId') appointmentId: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
    @Req() req: any,
  ): Promise<Appointment> {
    try {
      const user = req.user;
      if (user.role !== Role.DOCTOR) {
        throw new BadRequestException('Only doctors can update prescriptions.');
      }
      return await this.appointmentsService.updatePrescription(
        appointmentId,
        updatePrescriptionDto,
      );
    } catch (error) {
      console.error('Error updating prescription:', error);
      throw new InternalServerErrorException('Failed to update prescription');
    }
  }
}
