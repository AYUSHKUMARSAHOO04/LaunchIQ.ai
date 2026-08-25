import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

const availableCharts = [
  'Demand Forecast',
  'Consumer Segments',
  'Competitor Benchmark',
  'Product Strength Radar',
  'Revenue Projection',
  'Price Sensitivity Curve',
  'Market Sentiment',
  'Persona Analysis',
  'Launch Risk Score',
  'Purchase Funnel',
  'SWOT Intelligence',
  'Geographic Interest',
  'Marketing Channel Performance',
  'Product Feature Ranking',
  'AI Recommendations',
]

export default function ChooseInsights() {
  const navigate = useNavigate()

  const [selectedCharts, setSelectedCharts] =
    useState<string[]>([
      'Demand Forecast',
      'Consumer Segments',
      'Competitor Benchmark',
      'Product Strength Radar',
      'AI Recommendations',
    ])

  const toggleChart = (chart: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chart)
        ? prev.filter((item) => item !== chart)
        : [...prev, chart]
    )
  }

  const selectAllCharts = () => {
    setSelectedCharts(availableCharts)
  }

  const generateDashboard = () => {
    localStorage.setItem(
      'selectedCharts',
      JSON.stringify(selectedCharts)
    )

    navigate('/app/insights')
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Choose Your Insights
        </h1>

        <p className="text-muted-foreground">
          AI recommends charts based on your simulation.
          Choose the insights you want to analyze.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Recommended Visualizations
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {availableCharts.map((chart) => (
            <label
              key={chart}
              className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:bg-muted/50"
            >
              <input
                type="checkbox"
                checked={selectedCharts.includes(chart)}
                onChange={() => toggleChart(chart)}
                className="h-5 w-5"
              />

              <span className="font-medium">
                {chart}
              </span>
            </label>
          ))}

        </CardContent>
      </Card>

      <div className="flex gap-3">

        <Button
          variant="outline"
          onClick={selectAllCharts}
        >
          Select All Charts
        </Button>

        <Button onClick={generateDashboard}>
          Generate Insights Dashboard
        </Button>

      </div>

    </div>
  )
}
