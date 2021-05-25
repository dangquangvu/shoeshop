import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
    description: 'The name of the User',
    format: 'string',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly fullName: string;

  // Email
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email of the User',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly email: string;

  // Password
  @ApiProperty({
    example: 'admin',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;

  @ApiProperty({
    example: ["admin"],
    description: 'The roles of the User',
    isArray: true,
  })
  @ApiProperty()
  @IsOptional()
  readonly roles?: string[];
}

export class LoginUserDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email of the User',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly email: string;

  @ApiProperty({
    example: 'admin',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
}
