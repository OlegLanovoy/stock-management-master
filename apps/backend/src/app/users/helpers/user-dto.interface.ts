export interface IUserDto {
  username: string;
  email: string;
  stocks: {
    symbol: string;
    name: string
  }[]
}
