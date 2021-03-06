import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { checkObjectId, getHeaders } from 'src/shared/helper';
import { User } from 'src/shared/interfaces/db.interface';
import { AuthService } from '../auth.service';
import { InputUpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { db2api } from '../../../shared/helper';
import { IPagination } from 'src/adapter/pagination/pagination.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    protected authService: AuthService,
  ) { }

  async indexUser(pagination: IPagination) {
    const findParams = {};
    const usersCount = await this.userModel.countDocuments(findParams);
    const responseHeaders = getHeaders(pagination, usersCount);
    const users = await this.userModel
      .find(findParams)
      .select('roles email fullName block createdAt updatedAt')
      .skip(pagination.startIndex)
      .limit(pagination.perPage)
      .sort('-createdAt');

    return {
      items: db2api(users),
      headers: responseHeaders,
    };
  }

  async indexUserDetails(id: string) {
    if (!checkObjectId(id)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User is not found!');
    }
    return user;
  }

  async updateProfileUser(id: string, input: InputUpdateUserDto, accessToken: string) {
    if (!checkObjectId(id)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }

    const user_token = await this.authService.checkUserToken(accessToken);
    // if (!user_token.roles.includes('admin')) {
    //   if (user_token._id != id) {
    //     throw new ForbiddenException('Permission denied');
    //   }
    // }
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User is not found!');
    }
    let condition = {};
    if (input.fullName) {
      condition['fullname'] = input.fullName;
    }
    if (input.email) {
      condition['email'] = input.email;
    }

    if (input.phone) {
      condition['phone'] = input.phone;
    }
    if (input.address) {
      condition['address'] = input.address;
    }
    if (typeof input.gender === 'boolean') {
      condition['gender'] = input.gender;
    }
    if (user_token.roles.includes('admin')) {
      if (typeof input.enterprise === 'boolean') {
        condition['enterprise'] = input.enterprise;
      }
      if (typeof input.block === 'boolean') {
        condition['block'] = input.block;
      }
      if (input.roles) {
        condition['roles'] = [input.roles];
      }
    }
    if (typeof input.verified === 'boolean') {
      condition['verified'] = input.verified;
    }
    if (input.password) {
      const hashed = await bcrypt.hash(input.password, 10);
      condition['password'] = hashed;
    }
    try {
      await this.userModel.updateOne(
        { _id: id },
        {
          $set: condition,
        },
      );
    } catch (error) {
      throw new NotFoundException('Course is not update!');
    }
  }

  // block user in black l??st
  async blockUser(id: string) { }
}
