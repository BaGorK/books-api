import { BooksRepository } from './books.repository';
import { BookDto } from '../dtos/book.dto';
import { Book } from '../entities/Book';

export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async createBook(bookDto: BookDto): Promise<Book> {
    if (!this.validatePublicationYear(bookDto.publicationYear?.toString())) {
      throw new Error('Please Provide a valid publication year');
    }
    const book = new Book(
      bookDto.id || '',
      bookDto.title,
      bookDto.author,
      bookDto.isbn,
      bookDto.publicationYear
    );

    return this.booksRepository.create(book);
  }

  async getBook(id: string): Promise<Book | null> {
    return this.booksRepository.findById(id);
  }

  async getMyFavoriteBook(): Promise<Book | null> {
    return this.booksRepository.findMyFavorite();
  }

  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  async updateBook(id: string, bookDto: Partial<BookDto>) {
    if (
      bookDto?.publicationYear &&
      !this.validatePublicationYear(bookDto.publicationYear.toString())
    ) {
      throw new Error('Please Provide a valid publication year');
    }
    return this.booksRepository.update(id, bookDto);
  }

  async deleteBook(id: string): Promise<boolean> {
    return this.booksRepository.delete(id);
  }

  validatePublicationYear(year: string): boolean {
    return !isNaN(Number(year));
  }
}
