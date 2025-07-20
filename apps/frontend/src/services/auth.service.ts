import { AxiosError } from "axios";
import { authInstance, axiosInstance } from "./index";
import { IAddStockDTO } from "./portfolio.service";

export interface ILoginDto {
    email: string;
    password: string
}

export interface IRegisterDto {
    email: string;
    username: string;
    password: string;
}

export interface IGetMeResponse {
    username: string;
    email: string;
    stocks: IAddStockDTO[];
}
export const login = async (data: ILoginDto) => {
  try {
    const response = await authInstance.post('auth/login', data);
    if (response.status === 201) {
        return true;
    }
  } catch (err) {
    const axiosErr = err as AxiosError<{ message: string | string[] }>;

    if (axiosErr.response) {
      const { message } = axiosErr.response.data;

      if (Array.isArray(message)) {
        throw new Error(message.join('\n'));
      }

      throw new Error(message);
    }

    throw new Error('Login failed. Please try again.');
  }
};

export const getMe = async () => {
    try {
        const response = await axiosInstance.get<IGetMeResponse>('auth/me')
        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message)
            throw err
        }
        throw err;
    }
}

export const register = async (data: IRegisterDto) => {
  try {
    const response = await authInstance.post('auth/register', data);
    if (response.status === 201) {
        return true;
    }
  } catch (err) {
    const axiosErr = err as AxiosError<{ message: string | string[] }>;

    if (axiosErr.response) {
      const { message } = axiosErr.response.data;

      // Вернём как строку
      if (Array.isArray(message)) {
        throw new Error(message.join('\n'));
      }

      throw new Error(message);
    }

    throw new Error('Registration failed. Please try again.');
  }
};

export const logout = async() =>{
    try {
        const response = await axiosInstance.post('auth/logout')
        if (response.status === 201) {
            return true
        } else {
            return false
        }
    } catch(err) {
        if (err instanceof Error) {
            console.error(err.message)
            throw err
        }
        throw err;
        
    }
}
