import { NextFunction, Request, Response } from 'express';
import { RoleEnum, UserDto } from './../users/dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './../users/entities/User';
import { UserModel } from './../users/users.model';
import { isCorrectPassword } from './../lib/utils/password.util';
import { createJWT, verifyJWT } from './../lib/utils/token.util';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export class AuthController {
  constructor(private authService: AuthService) {}

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: 'Please provide an email and password',
      });
      return;
    }

    const user = await UserModel.findOne({
      email,
    });

    if (!user || !(await isCorrectPassword(password, user.password))) {
      res.status(401).json({
        message: 'Invalid email or password',
      });
      return;
    }

    const token = createJWT({ id: user._id.toString(), role: user.role });

    res.cookie('token', token, {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_IN as string) *
            24 *
            60 *
            60 *
            1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  }

  public logout(req: Request, res: Response): void {
    // clear cookie
    res.cookie('token', 'loggedout', {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      status: 'success',
      message: 'user logout successful',
    });
  }

  async signup(req: Request, res: Response): Promise<void> {
    console.log('Signing up user...');

    try {
      const userDto: UserDto = req.body;

      this.validateSignupDto(userDto);

      const user = await this.authService.signup(userDto);

      res.status(201).json(user);
    } catch (error) {
      console.log('Error signing up user:', error);
      res.status(500).json({
        message: 'Error signing up user',
        error: (error as Error).message,
      });
    }
  }

  public static restrictTo(...roles: RoleEnum[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) {
        res.status(403).json({
          status: 'fail',
          message: 'You do not have permission to perform this action',
        });
        return;
      }

      next();
    };
  }

  // PROTECT
  public static async protect(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // 1) Getting token and check if it's there
    let token = '';

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to get access',
      });
      return;
    }

    // 2) Verification token
    const decoded = verifyJWT(token);

    // 3) Check if user still exists
    const currentUser = await UserModel.findById(decoded.id);

    if (!currentUser) {
      res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist',
      });
      return;
    }

    const user = new User(
      currentUser._id.toString(),
      currentUser.fullName,
      currentUser.email,
      currentUser.password,
      currentUser.passwordConfirm || '',
      currentUser.role
    );

    req.user = user;

    console.log('GRANT ACCESS TO PROTECTED ROUTE FOR:', user);
    next();
  }

  // validation
  private validateSignupDto(userDto: UserDto): void {
    if (!userDto.email) {
      throw new Error('Please provide an email');
    }

    if (!userDto.fullName) {
      throw new Error('Please provide a fullName');
    }

    if (userDto.role) {
      throw new Error('Role cannot be set during signup');
    }

    if (!userDto.password) {
      throw new Error('Please provide a password');
    }

    if (!userDto.passwordConfirm) {
      throw new Error('Please provide a password confirmation');
    }

    if (userDto.password !== userDto.passwordConfirm) {
      throw new Error('Passwords do not match');
    }
  }
}
