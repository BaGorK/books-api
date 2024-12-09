import mongoose, { Document, Schema } from 'mongoose';
import { Book } from './entities/book.entity';

export interface IBookModel extends Omit<Book, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
    },
    author: {
      type: String,
      trim: true,
      required: [true, 'Author is required'],
      minlength: [3, 'Author must be at least 3 characters'],
    },
    isbn: {
      type: String,
      trim: true,
      required: [true, 'ISBN is required'],
      unique: true,
    },
    publicationYear: {
      type: Number,
      required: [true, 'Publication year is required'],
      min: [1, 'Publication year must be at least 1'],
    },
  },
  {
    timestamps: true,
  }
);

export const BookModel = mongoose.model<IBookModel>('Book', BookSchema);
