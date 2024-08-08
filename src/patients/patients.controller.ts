import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDetailsDto,
    @Req() req: any,
  ): Promise<Patient> {
    const patient = await this.patientsService.findById(id);

    if (patient.email !== req.user.email) {
      throw new BadRequestException(
        "You are not authorized to update this patient's details",
      );
    }

    return this.patientsService.updateDetails(id, updatePatientDto);
  }

  @Patch(':patientId/conditions')
  @UseGuards(JwtAuthGuard)
  async updatePatientConditions(
    @Param('patientId') patientId: string,
    @Body() updatePatientConditionsDto: UpdatePatientConditionsDto,
    @Req() req: any,
  ) {
    if (req.user.role !== Role.DOCTOR) {
      throw new BadRequestException(
        'Only doctors can update patient conditions',
      );
    }
    return this.patientsService.updatePatientConditions(
      patientId,
      updatePatientConditionsDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.remove(id);
  }
}
