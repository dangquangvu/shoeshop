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

export interface Product extends Document {
  code: string; // ma code giay
  styleIds?: [string];
  name: string;
  gender?: boolean;
  price: number;
  size?: { sizeDetail: number; quantity: number }[];
  oldFashion?: boolean;
  description?: string;
  images?: string[];
  material?: string; // chat lieu
  color?: string;
  created_at?: String;
  updated_at?: String;
}

export interface Transaction extends Document {
  email: string;
  name: string;
  phone: string;
  address: string;
  status: string; //[fail, pending, success]
  products: {
    id: string,
    sizeDetail: number,
    quantity: number,
    amount: number;
  }[];
  totalAmount: number;
  totalQuantity: number; // num of product
  messages?: string;
  // order feature
  isClose?: boolean; //[open/close]
  messagesCustomer?: string; // nguoi dat hang
  messageCancel?: string;
  closeDate?: String;
  created_at?: String;
  updated_at?: String;
}



// future feature
export interface Order extends Document {
  email: string;
  name: string;
  phone: string;
  address: string;
  products: {
    id: string,
    sizeDetail: number,
    quantity: number,
    amount: number;
  }[];
  totalAmount: number;
  totalQuantity: number; // num of product
  status: string; // [fail/pending/success]
  isClose: string; //[open/close]
  messagesCustomer?: string; // nguoi dat hang
  messageCancel?: string;
  closeDate?: String;
  created_at?: String;
  updated_at?: String;
}

export interface Comment extends Document {
  id_user_cmt: string;
  author: string;
  id_blog: string;
  content: string;
  like: number;
  isedit: boolean;
  isannounce: boolean;
  created_at?: String;
  updated_at?: String;
}