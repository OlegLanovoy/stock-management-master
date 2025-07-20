// stores/portfolioStore.ts
import { makeAutoObservable } from "mobx";

class PortfolioStore {
  stocks: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setStocks(symbols: string[]) {
    this.stocks = symbols;
  }

  addStock(symbol: string) {
    if (!this.stocks.includes(symbol)) {
      this.stocks.push(symbol);
    }
  }

  removeStock(symbol: string) {
    this.stocks = this.stocks.filter((s) => s !== symbol);
  }

  isInPortfolio(symbol: string) {
    return this.stocks.includes(symbol);
  }
}

export const portfolioStore = new PortfolioStore();
