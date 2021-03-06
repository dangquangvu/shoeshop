import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModel } from 'src/shared/constants';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../auth/user.schema';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionSchema } from './transaction.schema';
import { ProductSchema } from '../product/product.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: DbModel.TRANSACTION, schema: TransactionSchema },
      { name: DbModel.PRODUCT, schema: ProductSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule { }
