import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHeaders } from 'src/adapter/pagination/pagination.helper';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { TransactionStatusEnum } from 'src/shared/constants';
import { db2api } from 'src/shared/helper';
import { Transaction } from 'src/shared/interfaces/db.interface';
import { CreateTxDto, TxDto } from './transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private transactionModel: Model<Transaction>
    ) { }

    async indexTxs(filters: TxDto, pagination: IPagination): Promise<any> {
        const findParams = this.getFilterParamsIndexTxs(filters);
        const transactionCount = await this.transactionModel.count(findParams);
        const responseHeaders = getHeaders(pagination, transactionCount);
        const txs = await this.transactionModel.find(findParams)
            .skip(pagination.startIndex)
            .limit(pagination.perPage)
            .sort('-createdAt');

        return {
            items: db2api(txs),
            headers: responseHeaders,
        };
    }

    async createTx(createTxDto: CreateTxDto): Promise<Transaction> {
        const save = {
            name: createTxDto.name,
            address: createTxDto.address,
            phone: createTxDto.phone,
            productIds: createTxDto.productIds,
            price: createTxDto.price,
            quantity: createTxDto.quantity,
            status: TransactionStatusEnum.PENDING,
            ...(createTxDto.email && { email: createTxDto.email }),
            ...(createTxDto.messages && { messages: createTxDto.messages }),
        }

        const create = await this.transactionModel.create(save);
        return create;
    }


    getFilterParamsIndexTxs(filters) {
        const findParams: any = {}
        if (filters.name) {
            findParams.name = filters.name;
        }

        if (filters.email) {
            findParams.email = filters.email;
        }

        if (filters.phone) {
            findParams.phone = filters.phone;
        }

        if (filters.status) {
            findParams.status = filters.status;
        }
        return findParams;
    }
}
