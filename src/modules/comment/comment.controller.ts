import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';
import { CommenOutputDto, CreateCommentDto } from './comment.dto';
import { CreateBlogDTO } from '../blog/blog.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get comment in blog' })
  @UseGuards(JwtAuthGuard)
  indexComment(@Param('id') id: string) {
    return this.commentService.indexComment(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'post comment in blog' })
  @UseGuards(JwtAuthGuard)
  postComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    return this.commentService.postComment(id, accessToken, createCommentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create blog' })
  DeleteBlog(
    @Param('id') id: string,
    @Body() createBlogDTO: CreateBlogDTO,
    @Req() request: Request,
  ): Promise<any> {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    return this.commentService.deleteBlog(id, accessToken);
  }
}
