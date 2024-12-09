import express, { Request, Response } from 'express';
import cors from 'cors';
import { booksRoutes } from './books/books.route';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/api/v1/books', booksRoutes);

  app.use('/api', (req, res) => {
    res.status(200).json({
      hello: "Hello... Welcome, I'm Edmealem",
      message: 'send a request to /api/v1/books',
      GetById: '/api/v1/books/id => to get specific book',
      Get: '/api/v1/books => to get All books',
      Post: '/api/v1/books => to create a book',
      Put: '/api/v1/books/id => to update a book',
      Delete: '/api/v1/books/id => to delete a book',
      Favorite: '/api/v1/books/favorite => to get favorite books',
    });
  });

  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

  return app;
}
