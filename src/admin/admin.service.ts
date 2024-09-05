import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Role } from 'src/users/enums/role';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);
    const admin = new this.adminModel({
      ...dto,
      password: hashedPassword,
    });
    return admin.save();
  }

  async loginAdmin(
    dto: LoginDto,
  ): Promise<{ access_token: string; userId: string }> {
    const admin = await this.adminModel.findOne({ email: dto.email });
    if (!admin) {
      throw new UnauthorizedException('No admin found with this email.');
    }
    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      admin.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Incorrect password.');
    }
    const payload = {
      email: admin.email,
      role: Role.ADMIN,
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      userId: admin._id.toString(),
    };
  }
}
