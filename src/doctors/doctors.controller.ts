import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
import { UpdateDoctorDto } from './dto/update-doctor.dto';
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
    if (req.user.role !== Role.ADMIN) {
      throw new BadRequestException('Only admins can create doctors.');
    }
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Req() req: any,
  ): Promise<Doctor> {
    const doctor = await this.doctorsService.findById(id);
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }

    if (req.user.role !== Role.ADMIN) {
      throw new BadRequestException(
        "You are not authorized to update this doctor's details",
      );
    }

    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: any): Promise<Doctor> {
    if (req.user.role !== Role.ADMIN) {
      throw new BadRequestException('Only admins can delete doctors.');
    }
    return this.doctorsService.remove(id);
  }
}
