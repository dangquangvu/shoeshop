import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as data from '../../../blog.json';
import axios from 'axios';
import { CreateBlogDTO } from './blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Blog, User } from 'src/shared/interfaces/db.interface';
import { AuthService } from '../auth/auth.service';
import { isEmptyObj } from 'src/shared/helper';
@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private blogModel: Model<Blog>,
    @InjectModel('User') private userModel: Model<User>,
    protected authService: AuthService,
  ) {}

  getBlog = async () => {
    const data = await this.blogModel.find({});
    if (!data) {
      return [];
    }
    return data;
  };

  getDetailBlog = async (id: string) => {
    // if (!id || !isValidObjectId(id))
    //   throw new BadRequestException('Id is not match!');
    const data = await this.blogModel.find({ slug: id });
    if (!data) {
      throw new NotFoundException('Blog is not found!');
    }
    return data;
  };

  postBlog = async (createBlogDTO: CreateBlogDTO, accessToken: string) => {
    console.log(createBlogDTO);
    const user_token = await this.authService.checkUserToken(accessToken);
    const user = await this.userModel.findOne({ _id: user_token.id });
    if (!user) {
      throw new NotFoundException('User is not found!');
    }
    console.log(user_token);
    if (
      !createBlogDTO.blogTitle ||
      !createBlogDTO.blogImage ||
      !createBlogDTO.slug ||
      !createBlogDTO.blogText
    ) {
      throw new BadRequestException('Body blog is not match!');
    }
    console.log(createBlogDTO);
    if (createBlogDTO.blogTitle) {
      const exist = await this.blogModel.findOne({
        blogTitle: createBlogDTO.blogTitle,
      });
      if (exist) {
        throw new BadRequestException('Title is existed!');
      }
    }

    // postBlog = async (id: number) => {
    //   const blog = this.getDetailBlog(id)?.blogText;
    //   const url = 'http://127.0.0.1:5000/predict_topic';

    //   const message = { message: blog };
    //   console.log(message);
    //   const options = {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //     message,
    //   };
    //   const post = axios.post(url, options).then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   });
    //   return post;
    // };
    const blog = createBlogDTO.blogText;
    //this.getDetailBlog(id)?.blogText;
    const url = 'http://127.0.0.1:5000/predict_topic';
    const message = { message: blog };
    const options = {
      headers: { 'Content-Type': 'multipart/form-data' },
      message,
    };
    let post;
    try {
      await axios.post(url, options).then(res => {
        post = res.data;
      });
      console.log(post);
    } catch {
      err => {
        console.log(err);
      };
    }
    console.log(post.predicted);
    // let blogCategory = !isEmptyObj(post) ? post.predicted : 'null';
    let save = new this.blogModel({
      blogTitle: createBlogDTO.blogTitle,
      blogImage: createBlogDTO.blogImage,
      slug: createBlogDTO.slug,
      blogText: createBlogDTO.blogText,
      blogCategory: post.predicted || null,
      author: user.fullName,
      authorId: user.id,
    });

    try {
      await save.save();
      console.log(save);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('blog already exists');
      }
      throw error;
    }
    return save;
  };
  deleteBlog = async (id, accessToken) => {
    const user_token = await this.authService.checkUserToken(accessToken);
    const user = await this.userModel.findOne({ _id: user_token.id });
    if (!user) {
      throw new NotFoundException('User is not found!');
    }
    const blog = await this.blogModel.findOne({ _id: id });
    if (!blog) {
      throw new NotFoundException('Blog is not found!');
    }
    if (blog.authorId != user_token.id) {
      throw new NotFoundException('Permission denied!');
    }
    return await this.blogModel.remove({ _id: id });
  };
}
