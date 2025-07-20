import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(userDto: LoginUserDto, response: Response) {
    const user = await this.verifyUser(userDto);
    await this.generateTokens(user.email, response);
  }

  private async verifyUser(user: LoginUserDto) {
    const { email, password } = user;
    try {
      const user = await this.usersService.getUser({
        email,
      });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  async verifyUserRefreshToken(refreshToken: string, userEmail: string) {
    try {
      const user = await this.usersService.getUser({ email: userEmail });
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException(
          'User not found or refresh token missing.'
        );
      }
      const authenticated = await compare(refreshToken, user.refreshToken);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }

  async logout(userEmail: string, response: Response) {
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');
    await this.usersService.updateUser(
      { email: userEmail },
      { $unset: { refreshToken: '' } }
    );
  }

  async generateTokens(userEmail: string, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS'
          )
        )
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS'
          )
        )
    );

    const tokenPayload: TokenPayload = {
      userEmail,
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_ACCESS_TOKEN_EXPIRATION_MS'
      )}ms`,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_REFRESH_TOKEN_EXPIRATION_MS'
      )}ms`,
    });

    await this.usersService.updateUser(
      { email: userEmail },
      { $set: { refreshToken: await hash(refreshToken, 10) } }
    );

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresRefreshToken,
    });
  }

  async register(createUserDto: CreateUserDto, response: Response) {
    const user = await this.usersService.create(createUserDto);
    await this.generateTokens(user.email, response);
  }
}
