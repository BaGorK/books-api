import mongoose, { Document, Schema } from 'mongoose';
import { User } from './entities/User';

export interface IUserModel extends Omit<User, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, 'Full name is required'],
      minlength: [3, 'Full name must be at least 3 characters'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: {
        validator: (email: string) =>
          // eslint-disable-next-line no useless-escape
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
        message: (props: any) => `${props.value} is not a valid email address`,
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },

  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);
