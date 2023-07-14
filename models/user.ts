import mongoose, { Schema, Document, model } from 'mongoose';
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin : boolean;
  date: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const User = model<IUser>('user', UserSchema);
