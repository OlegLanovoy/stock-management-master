'use client';

import { useState, useEffect } from 'react';
import { StockCard } from '../ui/stock-card';
import {
  addStockToPortfolio,
  IAddStockDTO,
} from '../../services/portfolio.service';
import { portfolioStore } from '../../store/portfolioStore';
import { observer } from 'mobx-react-lite';

export const SearchSection = observer(() => {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      'https://financialmodelingprep.com/api/v3/search?query=AA&limit=20&apikey=YzkyNPAboNWEdJ20ZRFC7KMVJIi05cBi'
    )
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  const handleAdd = async (stock: IAddStockDTO) => {
    try {
      await addStockToPortfolio(stock);
      portfolioStore.addStock(stock);
    } catch (err) {
      console.error('Add stock failed', err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Search Stocks
      </h2>
      <div className="space-y-3">
        {results.map((stock) => (
          <StockCard
            key={stock.symbol}
            stock={{
              symbol: stock.symbol,
              name: stock.name,
              price: '-',
              change: '+0%',
              isPositive: true,
            }}
            onAdd={() => handleAdd(stock.symbol)}
            isInPortfolio={portfolioStore.isInPortfolio(stock.symbol)}
          />
        ))}
      </div>
    </div>
  );
});
