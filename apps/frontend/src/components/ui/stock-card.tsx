import { observer } from 'mobx-react-lite';
import { Paper } from '@mui/material';
import { IAddStockDTO } from '../../services/portfolio.service';
import { portfolioStore } from '../../store/portfolioStore';
import { Link } from 'react-router-dom';

export const StockCard = observer(({ stock }: { stock: IAddStockDTO }) => {
  const isInPortfolio = portfolioStore.isInPortfolio(stock.symbol);

  const onAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    portfolioStore.addStock(stock);
  };

  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    portfolioStore.removeStock(stock.symbol);
  };

  return (
    <Link to={`/stock/${stock.symbol}`}>
      <Paper className="p-4 mt-3 rounded-lg shadow flex justify-between items-center cursor-pointer hover:bg-gray-50 transition">
        <div>
          <p className="font-bold">{stock.symbol}</p>
          <p className="text-sm text-gray-500">{stock.name}</p>
        </div>
        <div />
        <div>
          {isInPortfolio ? (
            <button
              onClick={onRemove}
              className="text-red-500 text-xl font-bold"
            >
              −
            </button>
          ) : (
            <button
              onClick={onAdd}
              className="text-green-500 text-xl font-bold"
            >
              ＋
            </button>
          )}
        </div>
      </Paper>
    </Link>
  );
});
