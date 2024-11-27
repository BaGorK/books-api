import express, { Request, Response } from 'express';
import cors from 'cors';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/', (req: Request, res: Response) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

  return app;
}
