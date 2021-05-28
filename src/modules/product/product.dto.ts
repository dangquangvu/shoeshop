import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";
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