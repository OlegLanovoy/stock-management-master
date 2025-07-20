'use client';

import { Paper } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import type { StockCardProps } from '../../types/stock';

export function StockCard({
  stock,
  onAdd,
  onRemove,
  isInPortfolio,
}: StockCardProps & {
  onAdd?: () => void;
  onRemove?: () => void;
  isInPortfolio?: boolean;
}) {
  return (
    <Paper className="...">
      <div className="flex justify-between items-center">
        <div>
          <p>{stock.symbol}</p>
          <p>{stock.name}</p>
        </div>
        <div>
          <p>{stock.price}</p>
          <p>{stock.change}</p>
        </div>
        {isInPortfolio ? (
          <button onClick={onRemove}>−</button>
        ) : (
          <button onClick={onAdd}>＋</button>
        )}
      </div>
    </Paper>
  );
}
