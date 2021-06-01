import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHeaders } from 'src/adapter/pagination/pagination.helper';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { addMongooseParam, TransactionStatusEnum } from 'src/shared/constants';
import { db2api, isObjectId } from 'src/shared/helper';
import { Product, Transaction } from 'src/shared/interfaces/db.interface';
import { CreateTxDto, ProductTx, TxDto, UpdateTxDto } from './transaction.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private transactionModel: Model<Transaction>,
        @InjectModel('Product') private productModel: Model<Product>
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

    async createTx(createTx: CreateTxDto): Promise<Transaction> {
        const products: ProductTx[] = createTx.products;
        await this.checkProductIds(products);
        let totalQuantity = 0;
        let totalAmount = 0;
        createTx.products.map(el => {
            totalAmount += el.amount * el.quantity;
            totalQuantity += el.quantity;
        })
        const save = {
            name: createTx.name,
            address: createTx.address,
            phone: createTx.phone,
            products: createTx.products,
            totalAmount: totalAmount,
            totalQuantity: totalQuantity,
            status: TransactionStatusEnum.PENDING,
            ...(createTx.email && { email: createTx.email }),
            ...(createTx.messages && { messages: createTx.messages }),
        }
        return await this.transactionModel.create(save)
    }

    async updateTx(id: string, updateTx: UpdateTxDto): Promise<Transaction> {
        if (!isObjectId(id)) {
            throw new BadRequestException("id is not objectId!")
        }
        if (!TransactionStatusEnum[(updateTx.status).toUpperCase()]) {
            throw new BadRequestException("status is incorrect!")
        }

        const tx = await this.transactionModel.findOne({ _id: id });

        if (!tx) {
            throw new NotFoundException("Transaction is not found!")
        }
        tx.status = updateTx.status;
        tx.updated_at = JSON.stringify(Date.now());
        return await tx.save();
    }

    async deleteTx(id: string): Promise<Transaction> {
        if (!isObjectId(id)) {
            throw new BadRequestException("id is not objectId!")
        }
        const tx = await this.transactionModel.findOne({ _id: id });
        if (!tx) {
            throw new NotFoundException("Transaction is not found!")
        }

        return await tx.deleteOne();
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

    async checkProductIds(products: ProductTx[]) {
        const ids = products.map(item => item.id);
        this.isOcjectId(ids);
        const productIds = (await this.productModel.find({ _id: { $in: ids } })).map(el => (el._id).toString())
        if (this.equar(ids, productIds) === false) {
            throw new NotFoundException('ProductIds input not found');
        }
        return;
    }


    equar(a: string[], b: string[]) {
        for (let x = 0; x < a.length; x++) {
            if (b.includes(a[x]) === false) {
                return false;
            }
        }
        return true;
    }

    isOcjectId(ids: string[]) {
        for (let index = 0; index < ids.length; index++) {
            if (isObjectId(ids[index]) === false) {
                throw new BadRequestException('Product id ' + `${(ids[index])}` + 'is not ObjectId')
            }
        }
        return true;
    }
}
