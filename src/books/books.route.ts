import express from 'express';
import { BooksRepository } from './providers/books.repository';
import { BooksService } from './providers/books.service';
import { BooksController } from './books.controller';
import { AuthController } from './../auth/auth.controller';
import { RoleEnum } from './../users/dtos/user.dto';

const booksRepository = new BooksRepository();
const booksService = new BooksService(booksRepository);
const booksController = new BooksController(booksService);

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .get(AuthController.restrictTo(RoleEnum.ADMIN), (req, res) =>
    booksController.getAllBook(req, res)
  )
  .post(AuthController.restrictTo(RoleEnum.USER), (req, res) =>
    booksController.createBook(req, res)
  );

router
  .route('/favorite')
  .get((req, res) => booksController.getMyFavoriteBook(req, res));

router
  .route('/:id')
  .get((req, res) => booksController.getBook(req, res))
  .put(AuthController.restrictTo(RoleEnum.USER), (req, res) =>
    booksController.updateBook(req, res)
  )
  .delete(
    AuthController.restrictTo(RoleEnum.USER, RoleEnum.ADMIN),
    (req, res) => booksController.deleteBook(req, res)
  );

export const bookRoutes = router;
