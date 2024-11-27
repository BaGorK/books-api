import express, { Request, Response } from 'express';
import cors from 'cors';
import { booksRoutes } from './books/books.route';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/books', booksRoutes);

  app.use('/', (req, res) => {
    res.status(200).json({
      hello: "Hello... Welcome, I'm Edmealem",
      message: 'send a request to /books',
      GetById: '/books/id => to get specific book',
      Get: '/books => to get All books',
      Post: '/books => to create a book',
      Put: '/books/id => to update a book',
      Delete: '/books/id => to delete a book',
      Favorite: '/books/favorite => to get favorite books',
    });
  });

  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

  return app;
}
