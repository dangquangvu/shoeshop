import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
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
        type: String,
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

    @ApiProperty({
        title: "is close",
        description: 'status transaction close',
        type: Boolean,
        required: false,
        default: false
    })
    @IsBoolean()
    isClose: boolean;
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
        description: 'messages where recive the product',
        type: String,
        required: false,
    })
    @IsString()
    messagesCustomer?: string;

    @ApiProperty({
        description: 'messages where recive the product',
        type: String,
        required: false,
    })
    @IsString()
    messageCancel?: string;

    @ApiProperty({
        title: 'product',
        description: 'product',
        type: () => [ProductTx],
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    products: ProductTx[];
}

export class UpdateTxDto {
    @ApiProperty({
        title: 'status transaction',
        description: 'success',
        type: String,
        required: true,
        default: TransactionStatusEnum.SUCCESS,
        enum: getStringEnumValues(TransactionStatusEnum)
    })
    @IsString()
    status: string;

    @ApiProperty({
        title: 'messages cancel',
        description: 'I do not need the product',
        type: String,
        required: false,
    })
    @IsString()
    messageCancel?: string;
}

export class ProductTx {
    @ApiProperty({
        title: 'id',
        description: '60b1a23382f4dae5fd3612be',
        type: String,
        required: false,
        default: "60b1a23382f4dae5fd3612be"
    })
    @IsString()
    id: string;


    @ApiProperty({
        title: 'sizeDetail',
        description: '40',
        type: Number,
        default: 40,
        required: false,
    })
    @IsNumber()
    sizeDetail: number;

    @ApiProperty({
        title: 'quantity',
        description: '4',
        type: Number,
        default: 4,
        required: false,
    })
    @IsNumber()
    quantity: number;

    @ApiProperty({
        title: 'amount',
        description: '40000',
        type: Number,
        default: 40000,
        required: false,
    })
    @IsNumber()
    amount: number;
}