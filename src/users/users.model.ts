import mongoose, { Document, Schema } from 'mongoose';
import { User } from './entities/User';
import { RoleEnum } from './dtos/user.dto';
import bcrypt from 'bcryptjs';

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
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (this: IUserModel, passwordConfirm: string) {
          return passwordConfirm === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.USER,
    },
  },

  {
    timestamps: true,
  }
);

// Hash the password before save
UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password as string, salt);
  this.password = hashedPassword;

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);
