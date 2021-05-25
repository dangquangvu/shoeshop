import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { DbModel } from 'src/shared/constants';
import { AuthService } from './auth.service';
import { UserSchema } from './user.schema';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbModel.USER, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
