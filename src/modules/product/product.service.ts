import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHeaders } from 'src/adapter/pagination/pagination.helper';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { db2api } from 'src/shared/helper';
import { Product } from 'src/shared/interfaces/db.interface';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<Product>
    ) { }
    async indexProducts(filters: ProductDto, pagination: IPagination): Promise<any> {
        const findParams = this.getFilterParamsIndexProducts(filters);
        const transactionCount = await this.productModel.count(findParams);
        const responseHeaders = getHeaders(pagination, transactionCount);
        const txs = await this.productModel.find(findParams)
            .skip(pagination.startIndex)
            .limit(pagination.perPage)
            .sort('-createdAt');

        return {
            items: db2api(txs),
            headers: responseHeaders,
        };
    }

    getFilterParamsIndexProducts(filters) {
        const findParams: any = {}
        if (filters.code) {
            findParams.code = filters.code;
        }

        if (filters.name) {
            findParams.name = filters.name;
        }

        if (filters.gender) {
            findParams.gender = filters.gender;
        }

        if (filters.price) {
            findParams.price = filters.price;
        }

        if (typeof filters.oldFashion) {
            findParams.oldFashion = filters.oldFashion;
        }

        if (filters.material) {
            findParams.material = filters.material;
        }
        return findParams;
    }
}
