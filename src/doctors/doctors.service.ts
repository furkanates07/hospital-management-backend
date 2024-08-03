import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto, UpdateDoctorDto } from './dto';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = new this.doctorModel(createDoctorDto);
    return newDoctor.save();
  }

  async updateDoctor(
    id: string,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, {
      new: true,
    });
  }

  async findAllDoctors(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async findDoctorById(id: string): Promise<Doctor> {
    return this.doctorModel.findById(id).exec();
  }

  async deleteDoctor(id: string): Promise<Doctor> {
    return this.doctorModel.findByIdAndDelete(id).exec();
  }
}
