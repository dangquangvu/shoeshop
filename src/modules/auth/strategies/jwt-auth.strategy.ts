import { AuthService } from './../auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {  LoginUserDto } from '../auth.dto';
import { User } from 'src/shared/interfaces/db.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: LoginUserDto): Promise<User> {
    const user = await this.authService.validateUser(
      payload.email,
      payload.password,
    );
    if (!user) {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }
    console.log(user);
    return user;
  }
}
