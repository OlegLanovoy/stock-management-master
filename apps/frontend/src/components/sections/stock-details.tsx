"use client"

import { Button } from "@mui/material"
import { StatsCard } from "../../components/ui/stast-card"
import { ChartPlaceholder } from "../../components/ui/chart-placeholder"
import type { Stock } from "../../types/stock"

interface StockDetailsProps {
  stock: Stock | null
  onBack: () => void
}

export function StockDetails({ stock, onBack }: StockDetailsProps) {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button onClick={onBack} className="!text-gray-600 hover:!text-gray-900 !normal-case !mb-4">
            ← Back to Portfolio
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{stock?.name || "Stock Name"} Details</h1>
          <p className="text-gray-600">Real-time data and analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Symbol" value={stock?.symbol || "AAPL"} />
          <StatsCard title="Current Price" value={stock?.price || "$150.25"} />
          <StatsCard
            title="Today's Change"
            value={stock?.change || "+2.5%"}
            subtitle={stock?.changeValue || "+$3.75"}
          />
          <StatsCard title="Volume" value="45.2M" />
        </div>

        <ChartPlaceholder />
      </div>
    </div>
  )
}
