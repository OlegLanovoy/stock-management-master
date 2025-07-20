import { Paper } from "@mui/material";
import type { StatsCardProps } from "../../types/stock";

export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <Paper className="!p-6 !bg-gray-50 !border !border-gray-200">
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </Paper>
  );
}
