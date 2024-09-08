import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/users/enums/role';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreateDoctorsDto } from './dto/create-doctors.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Speciality } from './enums';
import { Doctor } from './schemas/doctor.schema';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
    @Req() req: any,
  ): Promise<Doctor> {
    try {
      if (req.user.role !== Role.ADMIN) {
        throw new BadRequestException('Only admins can create doctors.');
      }
      return await this.doctorsService.create(createDoctorDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(
        'An unexpected error occurred during doctor creation:',
        error,
      );
      throw new InternalServerErrorException('Failed to create doctor');
    }
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard)
  async createBulk(
    @Body() createDoctorsDto: CreateDoctorsDto,
    @Req() req: any,
  ): Promise<Doctor[]> {
    try {
      if (req.user.role !== Role.ADMIN) {
        throw new BadRequestException('Only admins can create doctors.');
      }
      const doctors = createDoctorsDto.doctors;
      const createdDoctors = [];
      for (const doctor of doctors) {
        createdDoctors.push(await this.doctorsService.create(doctor));
      }
      return createdDoctors;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(
        'An unexpected error occurred during doctor creation:',
        error,
      );
      throw new InternalServerErrorException('Failed to create doctors');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Doctor[]> {
    try {
      return await this.doctorsService.findAll();
    } catch (error) {
      console.error(
        'An unexpected error occurred while retrieving doctors:',
        error,
      );
      throw new InternalServerErrorException('Failed to retrieve doctors');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Doctor> {
    try {
      return await this.doctorsService.findById(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(
        'An unexpected error occurred while retrieving doctor:',
        error,
      );
      throw new InternalServerErrorException('Failed to retrieve doctor');
    }
  }

  @Get('email/:email')
  async getDoctorByEmail(@Param('email') email: string): Promise<Doctor> {
    try {
      return await this.doctorsService.getDoctorByEmail(email);
    } catch (error) {
      console.error(
        'An unexpected error occurred while retrieving doctor ID by email:',
        error,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve doctor ID by email',
      );
    }
  }

  @Get('speciality/:speciality')
  async findBySpeciality(
    @Param('speciality') speciality: Speciality,
  ): Promise<Doctor[]> {
    try {
      return await this.doctorsService.findBySpeciality(speciality);
    } catch (error) {
      console.error(
        'An unexpected error occurred while retrieving doctors by speciality:',
        error,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve doctors by speciality',
      );
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Req() req: any,
  ): Promise<Doctor> {
    try {
      const doctor = await this.doctorsService.findById(id);
      if (!doctor) {
        throw new BadRequestException('Doctor not found');
      }

      if (req.user.role !== Role.ADMIN) {
        throw new BadRequestException(
          "You are not authorized to update this doctor's details",
        );
      }

      return await this.doctorsService.update(id, updateDoctorDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(
        'An unexpected error occurred while updating doctor details:',
        error,
      );
      throw new InternalServerErrorException('Failed to update doctor');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: any): Promise<Doctor> {
    try {
      if (req.user.role !== Role.ADMIN) {
        throw new BadRequestException('Only admins can delete doctors.');
      }
      return await this.doctorsService.remove(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(
        'An unexpected error occurred while deleting doctor:',
        error,
      );
      throw new InternalServerErrorException('Failed to delete doctor');
    }
  }
}
