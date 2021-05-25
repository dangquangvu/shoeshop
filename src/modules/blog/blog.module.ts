import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModel } from 'src/shared/constants';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserSchema } from '../auth/user.schema';
import { BlogController } from './blog.controller';
import { BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbModel.USER, schema: UserSchema },
      { name: DbModel.BLOG, schema: BlogSchema },
    ]),
    AuthModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, AuthService],
})
export class BlogModule {}
