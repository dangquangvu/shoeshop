import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHeaders } from 'src/adapter/pagination/pagination.helper';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { addMongooseParam } from 'src/shared/constants';
import { db2api } from 'src/shared/helper';
import { Product } from 'src/shared/interfaces/db.interface';
import { CreateProductDto, ProductDto } from './product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<Product>
    ) { }
    async indexProducts(filters: ProductDto, pagination: IPagination): Promise<any> {
        const findParams = this.getFilterParamsIndexProducts(filters);
        console.log(findParams)
        const transactionCount = await this.productModel.countDocuments(findParams);
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

    async createProduct(body: CreateProductDto): Promise<Product> {
        const save = {
            code: body.code,
            name: body.name,
            gender: body.gender,
            price: body.price,
            description: body?.description || null,
            material: body.material
        }
        const create = await this.productModel.create(save);
        return create;
    }

    getFilterParamsIndexProducts(filters) {
        const findParams: any = {}
        if (filters.code) {
            findParams.code = addMongooseParam(
                findParams.code,
                '$regex',
                new RegExp(filters.code, 'i'),
            );
        }

        if (filters.name) {
            findParams.name = addMongooseParam(
                findParams.name,
                '$regex',
                new RegExp(filters.name, 'i'),
            );
        }

        if (filters.gender) {
            findParams.gender = filters.gender;
        }

        if (filters.price) {
            findParams.price = filters.price;
        }
        if (filters.oldFashion) {
            if (typeof filters.oldFashion !== undefined) {
                findParams.oldFashion = filters.oldFashion;
            }
        }

        if (filters.material) {
            findParams.material = filters.material;
        }
        return findParams;
    }
}
