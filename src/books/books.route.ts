import express from 'express';
import { BooksRepository } from './providers/books.repository';
import { BooksService } from './providers/books.service';
import { BooksController } from './books.controller';

const booksRepository = new BooksRepository();
const booksService = new BooksService(booksRepository);
const booksController = new BooksController(booksService);

const router = express.Router();

router
  .route('/')
  .get((req, res) => booksController.getAllBook(req, res))
  .post((req, res) => booksController.createBook(req, res));

router
  .route('/favorite')
  .get((req, res) => booksController.getMyFavoriteBook(req, res));

router
  .route('/:id')
  .get((req, res) => booksController.getBook(req, res))
  .put((req, res) => booksController.updateBook(req, res))
  .delete((req, res) => booksController.deleteBook(req, res));

export const booksRoutes = router;
