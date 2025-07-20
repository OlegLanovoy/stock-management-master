import { SearchSection } from './search-section';
import { StockList } from './stock-list';
import { PageHeader } from '../../components/layout/page-header';
import { useEffect, useState } from 'react';
import { getMe, IGetMeResponse } from '../../services/auth.service';
import { portfolioStore } from '../../store/portfolioStore';
import { observer } from 'mobx-react-lite';

const PortfolioOverviewComponent = () => {
  const [me, setMe] = useState<IGetMeResponse>();

  useEffect(() => {
    getMe().then((data) => {
      if (data) {
        setMe(data);
        portfolioStore.setStocks(data.stocks);
      }
    });
  }, []);

  return (
    <div className="p-8">
      <PageHeader
        title={`Welcome back, ${me?.username} 👋`}
        subtitle="Here's your stock portfolio overview"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SearchSection />
        <StockList />
      </div>
    </div>
  );
};

export const PortfolioOverview = observer(PortfolioOverviewComponent);
