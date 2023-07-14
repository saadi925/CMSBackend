import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  desc: string;
  image :string,
  content: string;
  slug: string;
}

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image:{
   type : String,
   required : true
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
