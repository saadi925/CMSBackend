import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  desc: string;
  content: string;
  bannerImg: string;
  slug: string;
  date: Date;
}

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  bannerImg: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
