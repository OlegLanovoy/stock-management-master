import { axiosInstance } from "./index";

export interface IAddStockDTO {
    symbol: string;
    name: string;
}

export const addStockToPortfolio = async (data: IAddStockDTO) => {
  return axiosInstance.put("/users/stock/add",data );
};

export const removeStockFromPortfolio = async (symbol: string) => {
  return axiosInstance.put("/users/stock/remove", { symbol });
};
