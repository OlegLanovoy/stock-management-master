import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { hash, genSalt } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { AddStockDTO } from './dto/add-stock.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>
  ) {}

  async getUser(options?: FilterQuery<UserModel>) {
    const user = await this.userModel.findOne(options).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toObject();
  }

  async create(userDto: CreateUserDto) {
    const { username, password, email } = userDto;

    const userInDb = await this.userModel.findOne({ username }).exec();
    if (userInDb) {
      throw new ConflictException('User already exists');
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    const user: UserModel = await new this.userModel({
      username,
      password: hashPassword,
      email,
    });

    await user.save();

    return user;
  }

  async updateUser(
    query: FilterQuery<UserModel>,
    data: UpdateQuery<UserModel>
  ) {
    return this.userModel.findOneAndUpdate(query, data);
  }

 async removeStockFromPortfolio(userId: string, symbol: string) {
  try {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          stocks: { symbol: symbol.toUpperCase() }
        }
      },
      { new: true }
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  } catch (error) {
    throw new BadRequestException('Failed to remove stock from portfolio');
  }
}


  async addStockToPortfolio(userId: string, stockDto: AddStockDTO) {
    const {symbol, name } = stockDto
  try {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          stocks: { symbol: symbol.toUpperCase(), name }
        }
      },
      { new: true }
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  } catch (error) {
    throw new BadRequestException('Failed to add stock to portfolio');
  }
}
}
