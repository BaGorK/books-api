import { Request, Response } from 'express';
import { BooksService } from './books.service';
import { BookDto } from './dtos/book.dot';

export class BooksController {
  constructor(private booksService: BooksService) {}

  async createBook(req: Request, res: Response): Promise<void> {
    console.log('creating book');

    try {
      const bookDto: BookDto = req.body;

      const book = await this.booksService.createBook(bookDto);

      res.status(201).json(book);
    } catch (error) {
      console.log('Error creating book:', error);
      res.status(500).json({
        message: 'Error creating book',
        error: (error as Error).message,
      });
    }
  }

  async getBook(req: Request, res: Response): Promise<void> {
    console.log('Fetching Book');
    try {
      const { id } = req.params;
      const book = await this.booksService.getBook(id);

      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({
          message: 'book not found',
        });
      }
    } catch (error) {
      console.log('Error fetching book:', error);
      res.status(500).json({
        message: 'Error fetching book',
        error: (error as Error).message,
      });
    }
  }

  async getMyFavoriteBook(req: Request, res: Response): Promise<void> {
    console.log('Fetching My Favorite Book');
    try {
      const book = await this.booksService.getMyFavoriteBook();

      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({
          message: 'no book found',
        });
      }
    } catch (error) {
      console.log('Error fetching book:', error);
      res.status(500).json({
        message: 'Error fetching book',
        error: (error as Error).message,
      });
    }
  }

  async getAllBook(req: Request, res: Response): Promise<void> {
    console.log('Fetching all Books');
    try {
      const allBooks = await this.booksService.getAllBooks();

      res.status(200).json(allBooks);
    } catch (error) {
      console.log('Error fetching all books:', error);
      res.status(500).json({
        message: 'Error fetching all books',
        error: (error as Error).message,
      });
    }
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    console.log('updating Book');
    try {
      const { id } = req.params;
      const bookDto: Partial<BookDto> = req.body;

      const updatedBook = await this.booksService.updateBook(id, bookDto);

      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        res.status(404).json({
          message: 'book not found',
        });
      }
    } catch (error) {
      console.log('Error updating book:', error);
      res.status(500).json({
        message: 'Error updating book',
        error: (error as Error).message,
      });
    }
  }
  async deleteBook(req: Request, res: Response): Promise<void> {
    console.log('deleting Book');
    try {
      const { id } = req.params;
      const result = await this.booksService.deleteBook(id);

      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({
          message: 'book not found',
        });
      }
    } catch (error) {
      console.log('Error deleting book:', error);
      res.status(500).json({
        message: 'Error deleting book',
        error: (error as Error).message,
      });
    }
  }
}
