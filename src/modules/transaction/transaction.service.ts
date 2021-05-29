import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHeaders } from 'src/adapter/pagination/pagination.helper';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { addMongooseParam, TransactionStatusEnum } from 'src/shared/constants';
import { db2api } from 'src/shared/helper';
import { Transaction } from 'src/shared/interfaces/db.interface';
import { CreateTxDto, TxDto } from './transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private transactionModel: Model<Transaction>
    ) { }

    async indexTxs(filters: TxDto, pagination: IPagination): Promise<any> {
        const findParams = this.getFilterParamsIndexTxs(filters);
        const transactionCount = await this.transactionModel.countDocuments(findParams);
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
        if (filters.name && filters.email) {
            findParams.$or = [{ name: filters.name }, { email: filters.email }];
        }
        if (filters.name && !filters.email) {
            findParams.name = addMongooseParam(findParams.name, '$regex', new RegExp(filters.name, 'i'));
        }

        if (filters.email && !filters.name) {
            findParams.email = addMongooseParam(
                findParams.email,
                '$regex',
                new RegExp(filters.email, 'i'),
            );
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
