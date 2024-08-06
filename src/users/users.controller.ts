import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('id-by-email/:email')
  async getUserIdByEmail(
    @Param('email') email: string,
  ): Promise<string | null> {
    return this.usersService.findUserIdByEmail(email);
  }
}
