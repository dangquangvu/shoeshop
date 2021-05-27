import {
    Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { Transaction } from 'src/shared/interfaces/db.interface';
import { createTxDto } from './transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private transactionModel: Model<Transaction>
    ) { }

    async indexTxs(createTx: createTxDto, pagination: IPagination): Promise<any> {

    }
}
