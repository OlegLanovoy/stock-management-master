import type { Stock } from "../types/stock"

export const MOCK_STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$150.25", change: "+2.5%", changeValue: "+$3.75", isPositive: true },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: "$2,750.80",
    change: "-1.2%",
    changeValue: "-$33.10",
    isPositive: false,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: "$305.15",
    change: "+0.8%",
    changeValue: "+$2.42",
    isPositive: true,
  },
  { symbol: "TSLA", name: "Tesla Inc.", price: "$850.45", change: "+5.2%", changeValue: "+$42.15", isPositive: true },
]
