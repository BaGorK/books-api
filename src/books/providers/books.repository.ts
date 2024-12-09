import { BookModel, IBookModel } from '../books.model';
import { Book } from '../entities/book.entity';
import { IBookRepository } from '../interfaces/IBookRepository';

export class BooksRepository implements IBookRepository {
  async create(book: Book): Promise<Book> {
    const createdBook = await BookModel.create(book);

    return this.mapToDomainModel(createdBook);
  }

  async findAll(): Promise<Book[]> {
    const books = await BookModel.find();

    return books.map((book) => this.mapToDomainModel(book));
  }

  async findById(id: string): Promise<Book | null> {
    const book = await BookModel.findById(id);

    if (!book) {
      return null;
    }

    return this.mapToDomainModel(book);
  }

  async findMyFavorite(): Promise<Book | null> {
    const book = await BookModel.findOne();

    if (!book) {
      return null;
    } else {
      return this.mapToDomainModel(book);
    }
  }

  async update(id: string, book: Partial<Book>): Promise<Book | null> {
    const updatedBook = await BookModel.findByIdAndUpdate(id, book, {
      new: true,
    });

    if (!updatedBook) {
      return null;
    }

    return this.mapToDomainModel(updatedBook);
  }

  async delete(id: string): Promise<boolean> {
    const result = await BookModel.findByIdAndDelete(id);

    return !!result;
  }

  private mapToDomainModel(bookModel: IBookModel): Book {
    return new Book(
      bookModel._id.toString(),
      bookModel.title,
      bookModel.author,
      bookModel.isbn,
      bookModel.publicationYear
    );
  }
}
