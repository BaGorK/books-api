import express from 'express';
import { UsersRepository } from './providers/users.repository';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

const router = express.Router();

router
  .route('/')
  .get((req, res) => usersController.getAllUsers(req, res))
  .post((req, res) => usersController.createUser(req, res));

router
  .route('/:id')
  .get((req, res) => usersController.getUser(req, res))
  .patch((req, res) => usersController.updateUser(req, res))
  .delete((req, res) => usersController.deleteUser(req, res));

export const userRoutes = router;
