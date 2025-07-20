import { IUserDto } from './user-dto.interface';
import { UserModel } from '../user.model';

export const toUserDto = (data: UserModel): IUserDto => {
  const { username, email, stocks } = data;

  const userDto: IUserDto = {
    username,
    email,
    stocks,
  };

  return userDto;
};
