import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { getStringEnumValues } from 'src/shared/helper';
import { UserRoles } from '../auth.interface';

export class InputUpdateUserDto {
  @ApiProperty({
    description: 'full name',
    format: 'string',
    required: false,
  })
  @IsString()
  fullName?: string;

  @ApiProperty({
    description: 'email user',
    format: 'number',
    required: false,
  })
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    description: 'new password ',
    format: 'string',
    required: false,
  })
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'role user',
    format: 'string',
    enum: getStringEnumValues(UserRoles),
    required: false,
  })
  @IsString()
  roles?: [string];

  @ApiProperty({
    description: 'phone user',
    format: 'string',
    required: false,
  })
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'address user',
    format: 'string',
    required: false,
  })
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'gender user',
    format: 'boolean',
    required: false,
  })
  @IsString()
  gender?: boolean;

  @ApiProperty({
    description: 'is enterprise account',
    format: 'boolean',
    required: false,
  })
  @IsString()
  enterprise?: boolean;

  @ApiProperty({
    description: 'is verified account with gmail',
    format: 'boolean',
    required: false,
  })
  @IsString()
  verified?: boolean;

  @ApiProperty({
    description: 'is block account',
    format: 'boolean',
    required: false,
  })
  @IsString()
  block?: boolean;
}
