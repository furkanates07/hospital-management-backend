import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './schemas/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('register')
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      return await this.adminService.create(createAdminDto);
    } catch (error) {
      console.error('Error during admin creation:', error);
      throw new InternalServerErrorException('Failed to create admin');
    }
  }

  @Post('login')
  async loginAdmin(@Body() dto: LoginDto) {
    try {
      return await this.adminService.loginAdmin(dto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error during admin login:', error);
      throw new InternalServerErrorException('Failed to login admin');
    }
  }
}
