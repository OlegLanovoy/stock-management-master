import { makeAutoObservable, runInAction } from "mobx";
import { addStockToPortfolio, removeStockFromPortfolio, IAddStockDTO } from "../services/portfolio.service";

class PortfolioStore {
  stocks: IAddStockDTO[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setStocks(stocks: IAddStockDTO[]) {
    this.stocks = stocks;
  }

  async addStock(stock: IAddStockDTO) {
    try {
      await addStockToPortfolio(stock);
      runInAction(() => {
        if (!this.stocks.find((s) => s.symbol === stock.symbol)) {
          this.stocks.push(stock);
        }
      });
    } catch (err) {
      console.error("Failed to add stock:", err);
    }
  }

  async removeStock(symbol: string) {
    try {
      await removeStockFromPortfolio(symbol);
      runInAction(() => {
        this.stocks = this.stocks.filter((s) => s.symbol !== symbol);
      });
    } catch (err) {
      console.error("Failed to remove stock:", err);
    }
  }

  isInPortfolio(symbol: string) {
    return this.stocks.some((s) => s.symbol === symbol);
  }
}

export const portfolioStore = new PortfolioStore();
