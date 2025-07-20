import { Controller, Body, Post, Res, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import type { Response } from 'express';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UserModel } from '../users/user.model';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { toUserDto } from '../users/helpers/toUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
     @Res({ passthrough: true }) res: Response 
  ) {
    await this.authService.register(createUserDto, res);
    return {
      message: 'User registered successfully',
    };
  }

  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
     await this.authService.login(loginUserDto, res);
     return {
      message: "User login successfully"
     }
  }

@UseGuards(JwtAuthGuard)
@Post('logout')
public async logout(
  @CurrentUser() user: UserModel,
  @Res({ passthrough: true }) res: Response // ✅
) {
  await this.authService.logout(user.email, res);
  return {
    message: 'User logged out successfully',
  };
}

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  public async refresh(@CurrentUser() user: UserModel, @Res({passthrough: true}) res: Response) {
    await this.authService.generateTokens(user.email, res);
    return {
      message: 'Tokens refreshed successfully',
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@CurrentUser() user: UserModel) {
    return toUserDto(user);
  }
}
