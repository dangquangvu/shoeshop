import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  BlogFilter,
  BlogResponse,
  CreateBlogDTO,
  updateBlogDTO,
} from './blog.dto';
import { BlogService } from './blog.service';
import { Request, Response } from 'express';
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get blogs' })
  getBlog(): Promise<any> {
    return this.blogService.getBlog();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get details blog' })
  getDetailBlog(@Param('id') id: string): Promise<any> {
    return this.blogService.getDetailBlog(id);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create blog' })
  postBlog(
    @Body() createBlogDTO: CreateBlogDTO,
    @Req() request: Request,
  ): Promise<any> {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    return this.blogService.postBlog(createBlogDTO, accessToken);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create blog' })
  DeleteBlog(@Param('id') id: string, @Req() request: Request): Promise<any> {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    return this.blogService.deleteBlog(id, accessToken);
  }
}
