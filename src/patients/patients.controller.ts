import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/users/enums/role';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreatePatientDto,
  UpdatePatientConditionsDto,
  UpdatePatientDetailsDto,
} from './dto';
import { PatientsService } from './patients.service';
import { Patient } from './schemas/patient.schema';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      return await this.patientsService.create(createPatientDto);
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new InternalServerErrorException('Failed to create patient');
    }
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientsService.findAll();
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new InternalServerErrorException('Failed to retrieve patients');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Patient> {
    try {
      const patient = await this.patientsService.findById(id);

      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      return patient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('An unexpected error occurred:', error);
      throw new InternalServerErrorException('Failed to retrieve patient');
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDetailsDto,
    @Req() req: any,
  ): Promise<Patient> {
    try {
      const patient = await this.patientsService.findById(id);

      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      if (patient.email !== req.user.email) {
        throw new BadRequestException(
          "You are not authorized to update this patient's details",
        );
      }

      return await this.patientsService.updateDetails(id, updatePatientDto);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('An unexpected error occurred:', error);
      throw new InternalServerErrorException(
        'Failed to update patient details',
      );
    }
  }

  @Patch(':patientId/conditions')
  @UseGuards(JwtAuthGuard)
  async updatePatientConditions(
    @Param('patientId') patientId: string,
    @Body() updatePatientConditionsDto: UpdatePatientConditionsDto,
    @Req() req: any,
  ) {
    try {
      if (req.user.role !== Role.DOCTOR) {
        throw new BadRequestException(
          'Only doctors can update patient conditions',
        );
      }

      return await this.patientsService.updatePatientConditions(
        patientId,
        updatePatientConditionsDto,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('An unexpected error occurred:', error);
      throw new InternalServerErrorException(
        'Failed to update patient conditions',
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Patient> {
    try {
      const patient = await this.patientsService.remove(id);

      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      return patient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('An unexpected error occurred:', error);
      throw new InternalServerErrorException('Failed to delete patient');
    }
  }
}
