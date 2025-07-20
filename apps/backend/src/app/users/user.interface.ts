export interface IUser {
  username: string;
  password: string;
  email: string;
  stocks?: {
    symbol: string;
    name: string
  }[];
}
