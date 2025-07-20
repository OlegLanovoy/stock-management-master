import { observer } from 'mobx-react-lite';
import { portfolioStore } from '../../store/portfolioStore';
import { removeStockFromPortfolio } from '../../services/portfolio.service';
import { StockCard } from '../ui/stock-card';

export const StockList = observer(() => {
  const handleRemove = async (symbol: string) => {
    try {
      await removeStockFromPortfolio(symbol);
      portfolioStore.removeStock(symbol);
    } catch (err) {
      console.error('Remove stock failed', err);
    }
  };

  return (
    <div>
      <h2>Your Holdings</h2>
      <div className="space-y-3">
        {portfolioStore.stocks.map((symbol: any) => (
          <StockCard
            key={symbol}
            stock={{
              symbol,
              name: symbol, // TODO: можно фетчить подробности
              price: '-',
              change: '+0%',
              isPositive: true,
            }}
            onRemove={() => handleRemove(symbol)}
            isInPortfolio
          />
        ))}
      </div>
    </div>
  );
});
