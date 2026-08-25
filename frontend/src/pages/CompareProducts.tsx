import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

import type { LaunchInsights } from '@/ai'

/**
 * Shape of a single record in the `simulationHistory` localStorage
 * backup written by NewSimulation.tsx after a simulation completes.
 */
type SimulationHistoryRecord = {
  id: number
  productName: string
  category: string
  industry: string
  audience: string
  price: string
  purchaseLikelihood: LaunchInsights['purchaseLikelihood']
  riskScore: LaunchInsights['riskScore']
  sentiment: LaunchInsights['sentiment']
  confidence: LaunchInsights['confidence']
  launchScore: number
}

export default function CompareProducts() {

  const [
    simulations,
    setSimulations,
  ] = useState<SimulationHistoryRecord[]>([])

  const [
    selectedProduct1,
    setSelectedProduct1,
  ] = useState<SimulationHistoryRecord | null>(null)

  const [
    selectedProduct2,
    setSelectedProduct2,
  ] = useState<SimulationHistoryRecord | null>(null)

  useEffect(() => {

    const savedHistory =
      JSON.parse(
        localStorage.getItem(
          'simulationHistory'
        ) || '[]'
      )

    setSimulations(
      savedHistory
    )

  }, [])

  const comparisonData =
    selectedProduct1 &&
    selectedProduct2
      ? [
          {
            metric:
              'Launch Score',
            ProductA:
              selectedProduct1.launchScore,
            ProductB:
              selectedProduct2.launchScore,
          },

          {
            metric:
              'Purchase Likelihood',
            ProductA:
              selectedProduct1.purchaseLikelihood,
            ProductB:
              selectedProduct2.purchaseLikelihood,
          },

          {
            metric:
              'Market Sentiment',
            ProductA:
              selectedProduct1.sentiment,
            ProductB:
              selectedProduct2.sentiment,
          },

          {
            metric:
              'Risk Score',
            ProductA:
              selectedProduct1.riskScore,
            ProductB:
              selectedProduct2.riskScore,
          },
        ]
      : []

  const getWinner =
    (
      value1: number,
      value2: number
    ) => {

      if (
        value1 > value2
      ) {
        return 'Product A'
      }

      if (
        value2 > value1
      ) {
        return 'Product B'
      }

      return 'Tie'
    }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Compare Products
        </h1>

        <p className="text-muted-foreground">
          Compare launch intelligence
          between products.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Product A */}
        <Card>
          <CardHeader>
            <CardTitle>
              Product A
            </CardTitle>
          </CardHeader>

          <CardContent>

            <select
              className="w-full rounded-xl border border-border bg-background p-3"
              onChange={(e) => {

                const product =
                  simulations.find(
                    (
                      item
                    ) =>
                      item.id.toString() ===
                      e.target.value
                  )

                setSelectedProduct1(
                  product
                )
              }}
            >

              <option value="">
                Choose Product A
              </option>

              {simulations.map(
                (
                  item
                ) => (
                  <option
                    key={
                      item.id
                    }
                    value={
                      item.id
                    }
                  >
                    {
                      item.productName
                    }
                  </option>
                )
              )}

            </select>

          </CardContent>
        </Card>

        {/* Product B */}
        <Card>
          <CardHeader>
            <CardTitle>
              Product B
            </CardTitle>
          </CardHeader>

          <CardContent>

            <select
              className="w-full rounded-xl border border-border bg-background p-3"
              onChange={(e) => {

                const product =
                  simulations.find(
                    (
                      item
                    ) =>
                      item.id.toString() ===
                      e.target.value
                  )

                setSelectedProduct2(
                  product
                )
              }}
            >

              <option value="">
                Choose Product B
              </option>

              {simulations.map(
                (
                  item
                ) => (
                  <option
                    key={
                      item.id
                    }
                    value={
                      item.id
                    }
                  >
                    {
                      item.productName
                    }
                  </option>
                )
              )}

            </select>

          </CardContent>
        </Card>

      </div>

      {/* Comparison Results */}
      {selectedProduct1 &&
        selectedProduct2 && (
          <>
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              {[
                {
                  title:
                    'Launch Score',
                  key:
                    'launchScore',
                  suffix:
                    '%',
                },

                {
                  title:
                    'Purchase Intent',
                  key:
                    'purchaseIntent',
                  suffix:
                    '%',
                },

                {
                  title:
                    'Market Sentiment',
                  key:
                    'marketSentiment',
                  suffix:
                    '%',
                },

                {
                  title:
                    'Risk Score',
                  key:
                    'riskScore',
                  suffix:
                    '',
                },
              ].map(
                (
                  metric
                ) => (
                  <Card
                    key={
                      metric.key
                    }
                  >
                    <CardHeader>
                      <CardTitle>
                        {
                          metric.title
                        }
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-2">

                        <div className="flex justify-between">
                          <span>
                            {
                              selectedProduct1.productName
                            }
                          </span>

                          <span className="font-bold">
                            {
                              selectedProduct1[
                                metric.key
                              ]
                            }
                            {
                              metric.suffix
                            }
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>
                            {
                              selectedProduct2.productName
                            }
                          </span>

                          <span className="font-bold">
                            {
                              selectedProduct2[
                                metric.key
                              ]
                            }
                            {
                              metric.suffix
                            }
                          </span>
                        </div>

                        <p className="pt-2 text-sm text-green-500">
                          Winner:{' '}
                          {metric.key ===
                          'riskScore'
                            ? getWinner(
                                selectedProduct2[
                                  metric.key
                                ],
                                selectedProduct1[
                                  metric.key
                                ]
                              )
                            : getWinner(
                                selectedProduct1[
                                  metric.key
                                ],
                                selectedProduct2[
                                  metric.key
                                ]
                              )}
                        </p>

                      </div>
                    </CardContent>
                  </Card>
                )
              )}

            </div>

            {/* Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Product Intelligence Comparison
                </CardTitle>
              </CardHeader>

              <CardContent className="h-[450px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={
                      comparisonData
                    }
                  >
                    <XAxis
                      dataKey="metric"
                    />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="ProductA"
                      fill="#8b5cf6"
                    />

                    <Bar
                      dataKey="ProductB"
                      fill="#3b82f6"
                    />

                  </BarChart>
                </ResponsiveContainer>

              </CardContent>
            </Card>
          </>
        )}

    </div>
  )
}
