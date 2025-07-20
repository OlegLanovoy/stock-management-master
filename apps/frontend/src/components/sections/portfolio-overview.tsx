import { SearchSection } from './search-section';
import { StockList } from './stock-list';
import { PageHeader } from '../../components/layout/page-header';

export function PortfolioOverview() {
  return (
    <div className="p-8">
      <PageHeader
        title="Welcome back! 👋"
        subtitle="Here's your stock portfolio overview"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SearchSection />
        <StockList />
      </div>
    </div>
  );
}
