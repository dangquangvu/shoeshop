import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, Comment, User } from 'src/shared/interfaces/db.interface';
import { AuthService } from '../auth/auth.service';
import { CommenOutputDto, CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private cmtModel: Model<Comment>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Blog') private blogModel: Model<Blog>,
    protected authService: AuthService,
  ) {}

  async indexComment(id: string): Promise<any> {
    const exist = await this.blogModel.find({ id: id });
    if (!id || exist) {
      throw new NotFoundException('Id has not found!');
    }
    return await this.cmtModel.find({ id_blog: id });
  }
  async postComment(
    id: string,
    accessToken,
    createCommentDto: CreateCommentDto,
  ): Promise<any> {
    const user_token = await this.authService.checkUserToken(accessToken);
    const user = await this.userModel.findOne({ _id: user_token.id });
    if (!user || createCommentDto.id_user_cmt != user_token.id) {
      throw new NotFoundException('User is not found!');
    }
    // const data
    if (!createCommentDto.content) {
      throw new BadGatewayException('Cmt is not match!');
    }
    const save = new this.cmtModel({
      id_user_cmt: user_token.id,
      author: user_token.fullName,
      id_blog: createCommentDto.id_blog,
      content: createCommentDto.content,
    });

    try {
      await save.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Cmt already exists');
      }
      throw error;
    }
    return save;
  }

  async deleteBlog(id, accessToken) {
    const user_token = await this.authService.checkUserToken(accessToken);
    const user = await this.userModel.findOne({ _id: user_token.id });
    if (!user) {
      throw new NotFoundException('User is not found!');
    }
    const blog = await this.blogModel.findOne({ _id: id });
    if (!blog) {
      throw new NotFoundException('Blog is not found!');
    }
    if (blog.authorId !== id) {
      throw new BadGatewayException('You not delete another comment user');
    }
    return this.blogModel.remove({ _id: id });
  }
}
