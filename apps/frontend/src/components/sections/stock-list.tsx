import { observer } from 'mobx-react-lite';
import { portfolioStore } from '../../store/portfolioStore';
import { StockCard } from '../ui/stock-card';

export const StockList = observer(() => {
  return (
    <div>
      <h2>Your Holdings</h2>
      <div className="space-y-3">
        {portfolioStore.stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
});
