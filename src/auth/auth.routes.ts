import express from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from './../users/providers/users.repository';

const usersRepository = new UsersRepository();
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

const router = express.Router();

router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/login', (req, res) => authController.login(req, res));

router.post('/logout', AuthController.protect, (req, res) =>
  authController.logout(req, res)
);

export const authRoutes = router;
