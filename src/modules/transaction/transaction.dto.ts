import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { getStringEnumValues } from '../../shared/helper';
import { TransactionStatusEnum } from '../../shared/constants';

export class createTxDto {
    @ApiProperty({
        description: 'full name',
        format: 'string',
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'email user',
        format: 'number',
        required: false,
    })
    @IsString()
    email?: string;

    @ApiProperty({
        description: 'telephone number',
        format: 'string',
        required: true,
    })
    @IsString()
    phone: string;


    @ApiProperty({
        description: 'address recive',
        format: 'string',
        required: true,
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: 'messages recive product',
        format: 'string',
        required: true,
    })
    @IsString()
    messages?: string;

    @ApiProperty({
        description: 'status transaction',
        format: 'string',
        required: true,
        default: TransactionStatusEnum.PENDING,
        enum: getStringEnumValues(TransactionStatusEnum)
    })
    @IsString()
    status: string;

    @ApiProperty({
        description: 'quantity product buy',
        format: 'number',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'productIds buy',
        format: 'string',
        required: true,
        isArray: true
    })
    @IsString()
    productIds: string[];

    @ApiProperty({
        description: 'price total product buy',
        format: 'number',
        required: true,
        default: 0
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
