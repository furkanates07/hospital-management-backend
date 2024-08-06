import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './schemas/doctor.schema';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  async findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.remove(id);
  }
}
