import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { getStringEnumValues } from '../../shared/helper';
import { TransactionStatusEnum } from '../../shared/constants';

export class OrderDto {
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
}