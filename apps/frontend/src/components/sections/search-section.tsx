import { useState, useEffect } from 'react';
import { StockCard } from '../ui/stock-card';
import { SearchInput } from '../ui/search-input';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { IAddStockDTO } from '../../services/portfolio.service';

export const SearchSection = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query || 'AA', 500);
  const [results, setResults] = useState<IAddStockDTO[]>([]);

  useEffect(() => {
    axios
      .get('https://financialmodelingprep.com/api/v3/search', {
        params: {
          query: debouncedQuery,
          limit: 20,
          apikey: 'YzkyNPAboNWEdJ20ZRFC7KMVJIi05cBi',
        },
      })
      .then((res) => setResults(res.data))
      .catch((err) => console.error('Search error:', err));
  }, [debouncedQuery]);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Search Stocks
      </h2>
      <SearchInput onChange={(query) => setQuery(query)} value={query} />
      <div className="space-y-3">
        {results.map((stock) => (
          <StockCard
            key={stock.symbol}
            stock={{
              symbol: stock.symbol,
              name: stock.name,
            }}
          />
        ))}
      </div>
    </div>
  );
};
