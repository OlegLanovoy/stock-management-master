import { Button } from '@mui/material';
import { StatsCard } from '../../components/ui/stast-card';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface IStockProfile {
  symbol: string;
  price: number;
  changes: number;
  volAvg: number;
  companyName: string;
}

export function StockDetails() {
  const [stock, setStock] = useState<IStockProfile>();
  const navigate = useNavigate();
  const { symbol } = useParams();

  useEffect(() => {
    if (!symbol) return;

    axios
      .get<IStockProfile[]>(
        `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=YzkyNPAboNWEdJ20ZRFC7KMVJIi05cBi`
      )
      .then((res) => setStock(res.data[0]))
      .catch((err) => console.error('Failed to fetch stock profile:', err));
  }, [symbol]);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => navigate('/')}
            className="!text-gray-600 hover:!text-gray-900 !normal-case !mb-4"
          >
            ← Back to Portfolio
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {stock?.companyName || 'Stock Name'} Details
          </h1>
          <p className="text-gray-600">Real-time data and analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Symbol" value={stock?.symbol || '—'} />
          <StatsCard
            title="Current Price"
            value={stock?.price ? `$${stock.price.toFixed(2)}` : '—'}
          />
          <StatsCard
            title="Today's Change"
            value={
              stock?.price && stock?.changes
                ? `${(
                    (stock.changes / (stock.price - stock.changes)) *
                    100
                  ).toFixed(2)}%`
                : '—'
            }
          />

          <StatsCard
            title="Volume Avg"
            value={stock?.volAvg ? stock.volAvg.toLocaleString() : '—'}
          />
        </div>
      </div>
    </div>
  );
}
