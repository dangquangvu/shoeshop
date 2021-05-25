import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDTO {
  @ApiProperty({
    description: 'title',
    format: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  blogTitle: string;

  @ApiProperty({
    description: 'blogImage',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'desc',
    format: 'string',
    required: false,
  })
  @IsString()
  desc?: string;

  @ApiProperty({
    description: 'blogText',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  blogText: string;

  @ApiProperty({
    description: 'blogImage',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  blogImage?: string;
}

export class BlogFilter {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  authorId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
  })
  title?: string;
}

export class updateBlogDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, required: false })
  authorId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'desc',
    format: 'string',
    required: false,
  })
  @IsString()
  desc?: string;

  @ApiProperty({
    description: 'content',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  content?: string;
}

export class BlogResponse {
  @ApiProperty({
    type: String,
    example: '',
  })
  authorId: string;

  @ApiResponseProperty({
    type: String,
    example: 'eth',
  })
  title: string;

  @ApiResponseProperty({
    type: String,
    example: 'normal',
  })
  desc?: string;

  @ApiResponseProperty({
    type: String,
    example: '0',
  })
  content: string;
}
