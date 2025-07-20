import { axiosInstance } from "./index";

export interface ILoginDto {
    email: string;
    password: string
}

export interface IRegisterDto {
    email: string;
    username: string;
    password: string;
}

interface IGetMeResponse {
    username: string;
    email: string;
    stocks: string[];
}
export const login = async (data : ILoginDto) =>{
    try {
        const response = await axiosInstance.post('auth/login', data)
        if (response.data.message) {
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
        const response = await axiosInstance.post('auth/register', data)
        if (response.data.message) {
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

export const logout = async() =>{
    try {
        const response = await axiosInstance.post('auth/logout')
        if (response.data.message) {
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
