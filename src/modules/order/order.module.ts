import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModel } from 'src/shared/constants';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../auth/user.schema';
import { ProductSchema } from '../product/product.schema';
import { TransactionModule } from '../transaction/transaction.module';
import { TransactionSchema } from '../transaction/transaction.schema';
import { TransactionService } from '../transaction/transaction.service';
import { OrderController } from './order.controller';
import { OrderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
  imports: [
    AuthModule,
    TransactionModule,
    MongooseModule.forFeature([
      { name: DbModel.ORDER, schema: OrderSchema },
      { name: DbModel.TRANSACTION, schema: TransactionSchema },
      { name: DbModel.PRODUCT, schema: ProductSchema },
    ]),
  ],
  controllers: [OrderController,],
  providers: [OrderService, TransactionService],
  exports: [OrderService],
})
export class OrderModule { }
