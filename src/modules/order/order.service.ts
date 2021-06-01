import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { Order, Transaction } from 'src/shared/interfaces/db.interface';

@Injectable()
export class OrderService {
    indexOrders(filters: any, pagination: IPagination): any {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectModel('Transaction') private transactionModel: Model<Transaction>,
        @InjectModel('Order') private orderModel: Model<Order>,
    ) { }


}
