import {
  Injectable,
  Redirect,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import res from 'express';

const EXPIRE_TIME = 200 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        role: user.role,
      },
    };
    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    console.log(dto);
    const user = await this.userService.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      console.log(user);
      return result;
    }
    throw new UnauthorizedException('Username / Password incorrect');
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      }),
    };
  }

  async googleLogin(req, @Res() res) {
    if (!req.user) {
      return 'No user from google';
    }
    const checkGoogle = await this.userService.findByEmail(req.user.email);
    const pass = Math.random().toString(36).slice(-8);
    const regisUser = {
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      password: pass,
      role: 'user',
    };
    if (!checkGoogle) {
      const registerUser = await this.userService.create(regisUser);
    }

    const user = await this.userService.findByEmail(req.user.email);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        role: user.role,
      },
    };
    const { password: userPassword, ...result } = user;

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '50d',
      secret: process.env.jwtSecretKey,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.jwtRefreshTokenKey,
    });

    const expiresIn = new Date().setTime(new Date().getTime() + EXPIRE_TIME);

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .json({
        message: 'User information from Google',
        user: result,
        backendTokens: {
          accessToken,
          refreshToken,
          expiresIn,
        },
      })
      .redirect('http://localhost:3000/api/auth/callback/google');
  }
}
