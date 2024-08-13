import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateAdminDto): Promise<Admin> {
    const admin = new this.adminModel(dto);
    return admin.save();
  }

  async login(dto: LoginAdminDto): Promise<{ access_token: string }> {
    const admin = await this.adminModel.findOne({ email: dto.email });
    if (!admin) {
      throw new UnauthorizedException('No admin found with this email.');
    }
    if (admin.password !== dto.password) {
      throw new UnauthorizedException('Incorrect password.');
    }
    const payload = { email: admin.email, role: admin.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
