import { Document } from 'mongoose';

export interface User extends Document {
  fullName?: string;
  email: string;
  password: string;
  roles?: string;
  phone?: String;
  address?: String;
  gender?: boolean;
  block?: boolean;
  permission?: [string];
  enterprise?: boolean;
  verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
export interface Blog extends Document {
  blogCategory?: string;
  blogTitle: string;
  slug: string;
  authorId: string;
  author: string;
  blogImage?: String;
  blogText: String;
  created_at?: Date;
  updated_at?: Date;
}

// for course
export interface Comment extends Document {
  id_user_cmt: string;
  author: string;
  id_blog: string;
  content: string;
  like: number;
  isedit: boolean;
  isannounce: boolean;
  created_at?: Date;
  updated_at?: Date;
}
