import { Paper } from "@mui/material";

export function ChartPlaceholder() {
  return (
    <Paper className="!p-8 !bg-gradient-to-r !from-gray-50 !to-slate-50 !border !border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Chart</h3>
      <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Chart visualization would go here</p>
      </div>
    </Paper>
  );
}
