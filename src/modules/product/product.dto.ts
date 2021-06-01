import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { getStringEnumValues } from '../../shared/helper';
import { ProductMaterialEnum, TransactionStatusEnum } from '../../shared/constants';

export class ProductDto {
    @ApiProperty({
        title: "code product",
        description: 'HQ111',
        type: String,
        required: false,
    })
    @IsString()
    code: string;

    @ApiProperty({
        title: 'name product',
        description: 'giay da nam han quoc',
        type: String,
        required: false,
    })
    @IsString()
    name: string;

    @ApiProperty({
        title: "gender product",
        description: 'giay nam',
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    gender: boolean;

    @ApiProperty({
        title: 'price',
        description: '500,000',
        type: Number,
        required: false,
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        title: "old fashion",
        description: 'true or false',
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    oldFashion: boolean;

    @ApiProperty({
        title: "material product",
        description: 'da hay vai',
        type: String,
        required: false,
        enum: getStringEnumValues(ProductMaterialEnum)
    })
    @IsString()
    material: string;
}

export class CreateProductDto {
    @ApiProperty({
        title: "code product",
        description: 'HQ111',
        type: String,
        required: true,
    })
    @IsString()
    code: string;

    @ApiProperty({
        title: 'name product',
        description: 'giay da nam han quoc',
        type: String,
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        title: 'description',
        description: 'giay da nam han quoc sieu dep',
        type: String,
        required: false,
    })
    @IsString()
    description: string;

    @ApiProperty({
        title: "gender product",
        description: 'giay nam',
        type: Boolean,
        required: true,
    })
    @IsBoolean()
    gender: boolean;

    @ApiProperty({
        title: 'price',
        description: '500,000',
        type: Number,
        required: true,
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        title: "material product",
        description: 'da hay vai',
        type: String,
        required: true,
        enum: getStringEnumValues(ProductMaterialEnum)
    })
    @IsString()
    material: string;
}
export class UpdateProductDto {
    @ApiProperty({
        title: "code product",
        description: 'HQ111',
        type: String,
        required: false,
    })
    @IsString()
    code?: string;

    @ApiProperty({
        title: 'name product',
        description: 'giay da nam han quoc',
        type: String,
        required: false,
    })
    @IsString()
    name?: string;

    @ApiProperty({
        title: 'description',
        description: 'giay da nam han quoc sieu dep',
        type: String,
        required: false,
    })
    @IsString()
    description: string;

    @ApiProperty({
        title: 'images',
        description: 'objectIds',
        type: Array,
        required: false,
    })
    @IsArray()
    @IsString()
    images: string[];

    @ApiProperty({
        title: 'size',
        description: 'size',
        type: () => [Size],
        required: false,
    })
    @IsArray()
    @IsString()
    size: Size[];

    @ApiProperty({
        title: "gender product",
        description: 'giay nam',
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    gender: boolean;

    @ApiProperty({
        title: 'price',
        description: '500,000',
        type: Number,
        required: false,
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        title: "material product",
        description: 'da hay vai',
        type: String,
        required: false,
        enum: getStringEnumValues(ProductMaterialEnum)
    })
    @IsString()
    material: string;
}
class Size {
    @ApiProperty({
        title: 'sizeDetail',
        description: '40',
        type: Number,
        required: false,
    })
    @IsNumber()
    sizeDetail: number;

    @ApiProperty({
        title: 'quantity',
        description: '40000',
        type: Number,
        required: false,
    })
    @IsString()
    quantity: number;
}