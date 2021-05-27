import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../../shared/interfaces/db.interface';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { db2api, getHeaders } from 'src/shared/helper';
import { createTxDto } from './transaction.dto';

@Injectable()
export class TransactionModel {
    constructor(@InjectModel('Transaction') private transactionModel: Model<Transaction>) { }

    async indexTxs(filters, findParam = {}, pagination: IPagination) {
        const transactionCount = await this.transactionModel.count(findParam);
        const responseHeaders = getHeaders(pagination, transactionCount);
        const txs = await this.transactionModel.find(findParam)
            .skip(pagination.startIndex)
            .limit(pagination.perPage)
            .sort('-createdAt');
        if (!txs) {
            throw new NotFoundException('Transactions is not found!');
        }
        return {
            items: db2api(txs),
            headers: responseHeaders,
        };
    }

    async insertTx(body: Transaction) {
        const tx = await this.transactionModel.create(body)
        return db2api(tx);
    }

    async updateTx(txId: string) {
        const tx = await this.transactionModel.findOne({ id: txId })
        if (!tx) {
            throw new NotFoundException('Transaction is not found!');
        }


        return db2api(tx);
    }

    async deleteTx(txId: string) {
        const tx = await this.transactionModel.findOne({ id: txId })
        if (!tx) {
            throw new NotFoundException('Transactions is not found!');
        }
        return db2api(tx);
    }
}
