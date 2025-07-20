export function PortfolioValueCard() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
      <h3 className="font-semibold text-gray-900 mb-2">Portfolio Value</h3>
      <p className="text-3xl font-bold text-gray-900">$24,567.89</p>
      <p className="text-green-600 text-sm font-medium mt-1">
        +$1,234.56 (+5.3%) today
      </p>
    </div>
  );
}
