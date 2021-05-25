import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './auth.dto';
import { UserRoles } from './auth.interface';
import * as bcrypt from 'bcrypt';
import * as Cryptr from 'cryptr';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/shared/interfaces/db.interface';

@Injectable()
export class AuthService {
  cryptr: any;
  constructor(@InjectModel('User') private userModel: Model<User>) {
    this.cryptr = new Cryptr(process.env.JWT_SECRET);
  }

  createAccessToken(payload: any) {
    const accessToken = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return this.encryptText(accessToken);
  }

  async signUp(authCredentialsDto: CreateUserDto) {
    let { email, password, fullName, roles } = authCredentialsDto;
    console.log(authCredentialsDto);
    if (!roles) {
      roles = [UserRoles.USER];
    }
    const user = new this.userModel({
      email: email,
      password: password,
      fullName: fullName,
      roles: roles,
    });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    const user = await this.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException(
        'Password or email not match, please try again!',
      );
    }
    await this.checkPassword(loginUserDto.password, user.password);
    const payload = { email: user.email, id: user._id };

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      accessToken: this.createAccessToken(payload),
      refreshToken: this.createAccessToken(payload),
    };
  }

  async decodejwt(accessToken: string): Promise<any> {
    const cryptr = new Cryptr(process.env.JWT_SECRET);
    let decrypt;
    try {
      decrypt = cryptr.decrypt(accessToken);
    } catch (error) {
      throw new UnauthorizedException();
    }
    const payload = await jwt.decode(decrypt);
    return payload;
  }

  async checkUserToken(accessToken: string) {
    const payload = await this.decodejwt(accessToken);

    const user = await this.findUserByEmail(payload.payload.email);
    if (!user) {
      return null;
    }
    return user;
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Wrong email or password.');
    }
    return user;
  }

  async checkPassword(attemptPass: string, password: string) {
    const match = await bcrypt.compare(attemptPass, password);
    if (!match) {
      throw new NotFoundException('Wrong email or password.');
    }
    return match;
  }
  encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }
}
