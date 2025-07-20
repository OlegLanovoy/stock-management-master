import { toUserDto } from './helpers/toUserDto';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserModel } from './user.model';
import { AddStockDTO } from './dto/add-stock.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Put('stock/remove')
  @UseGuards(JwtAuthGuard)
  async removeStock(
    @CurrentUser() user: UserModel,
    @Body('symbol') symbol: string
  ) {
    const userId = user._id as string;
    return toUserDto(
      await this.usersService.removeStockFromPortfolio(userId, symbol)
    );
  }
  @Put('stock/add')
  @UseGuards(JwtAuthGuard)
  async addStock(
    @CurrentUser() user: UserModel,
    @Body() addStockDto: AddStockDTO
  ) {
    const userId = user._id as string;
    return toUserDto(
      await this.usersService.addStockToPortfolio(userId,  addStockDto)
    );
  }
}
