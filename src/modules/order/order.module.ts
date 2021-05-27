import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DbModel} from 'src/shared/constants';
import {AuthModule} from '../auth/auth.module';
import {UserSchema} from '../auth/user.schema';
import {OrderController} from './order.controller';
import {OrderSchema} from './order.schema';
import {OrderService} from './order.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {name: DbModel.ORDER, schema: OrderSchema},
      {name: DbModel.USER, schema: UserSchema},
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
