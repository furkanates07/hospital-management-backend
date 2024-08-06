import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserIdByEmail(email: string): Promise<string | null> {
    const user = await this.userModel.findOne({ email }).select('_id').exec();
    return user ? user._id.toString() : null;
  }
}
