import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { getStringEnumValues } from '../../shared/helper';
import { TransactionStatusEnum } from '../../shared/constants';

export class TxDto {
    @ApiProperty({
        title: "full name",
        description: 'david',
        type: String,
        required: false,
    })
    @IsString()
    name: string;

    @ApiProperty({
        title: "email user",
        description: 'admin@gmail.com',
        type: Number,
        required: false,
    })
    @IsString()
    email: string;

    @ApiProperty({
        title: "telephone number",
        description: '0911111111',
        type: String,
        required: false,
    })
    @IsString()
    phone: string;

    @ApiProperty({
        title: "address recive",
        description: 'so 1 pham van dong cau giay ha noi',
        type: String,
        required: false,
    })
    @IsString()
    address: string;

    @ApiProperty({
        title: 'status transaction',
        description: 'pending',
        type: String,
        required: false,
        default: TransactionStatusEnum.PENDING,
        enum: getStringEnumValues(TransactionStatusEnum)
    })
    @IsString()
    status: string;
}

export class CreateTxDto extends TxDto {
    @ApiProperty({
        description: 'full name',
        format: 'string',
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'telephone number',
        type: String,
        required: true,
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'address recive',
        type: String,
        required: true,
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: 'messages recive product',
        type: String,
        required: false,
    })
    @IsString()
    messages?: string;

    @ApiProperty({
        description: 'quantity product buy',
        type: Number,
        required: true,
    })
    @IsNumber()
    quantity: number;

    @IsArray()
    @IsString({ each: true })
    @ApiProperty({
        type: [String],
        description: 'product Ids',
    })
    productIds: string[];

    @ApiProperty({
        description: 'price total product buy',
        type: String,
        required: true,
        default: 0
    })
    @IsNumber()
    price: number;
}