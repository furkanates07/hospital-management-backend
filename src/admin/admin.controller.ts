import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('register')
  async register(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginAdminDto) {
    return this.adminService.login(dto);
  }
}
