import { useState } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

export default function CompetitorIntelligence() {

  const [
    competitor1,
    setCompetitor1,
  ] = useState('')

  const [
    competitor2,
    setCompetitor2,
  ] = useState('')

  const [
    competitor3,
    setCompetitor3,
  ] = useState('')

  const [
    analyzed,
    setAnalyzed,
  ] = useState(false)

  const simulationData =
    JSON.parse(
      localStorage.getItem(
        'simulationData'
      ) || '{}'
    )

  const simulationResults =
    JSON.parse(
      localStorage.getItem(
        'simulationResults'
      ) || '{}'
    )

  const yourScore =
    simulationResults.launchScore ||
    80

  const competitorData = [
    {
      name:
        simulationData.productName ||
        'Your Product',
      score:
        yourScore,
    },

    {
      name:
        competitor1 ||
        'Competitor A',
      score:
        Math.max(
          50,
          yourScore - 8
        ),
    },

    {
      name:
        competitor2 ||
        'Competitor B',
      score:
        Math.max(
          50,
          yourScore - 15
        ),
    },

    {
      name:
        competitor3 ||
        'Competitor C',
      score:
        Math.max(
          50,
          yourScore - 5
        ),
    },
  ]

  const getRecommendation =
    () => {

      const price =
        Number(
          simulationData.price?.replace(
            /\D/g,
            ''
          )
        ) || 0

      if (
        price > 100
      ) {

        return 'Your product appears premium-priced versus competitors. Strong branding and premium positioning will be essential.'

      }

      return 'Affordable pricing creates a competitive advantage. Focus on rapid customer acquisition and brand trust.'
    }

  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-4xl font-bold">
          Smart Competitor Intelligence
        </h1>

        <p className="text-muted-foreground">
          Benchmark your product
          against competitors.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Add Competitors
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

        <input
            type="text"
            placeholder="Competitor 1"
            value={competitor1}
            onChange={(e) =>
              setCompetitor1(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-border bg-background p-3 outline-none"
          />

          <input
            type="text"
            placeholder="Competitor 2"
            value={competitor2}
            onChange={(e) =>
              setCompetitor2(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-border bg-background p-3 outline-none"
          />

          <input
            type="text"
            placeholder="Competitor 3"
            value={competitor3}
            onChange={(e) =>
              setCompetitor3(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-border bg-background p-3 outline-none"
          />

          <Button
            size="lg"
            onClick={() =>
              setAnalyzed(true)
            }
          >
            Analyze Competitors
          </Button>

        </CardContent>
      </Card>

      {/* Results */}
      {analyzed && (
        <>
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <Card>
              <CardHeader>
                <CardTitle>
                  Your Launch Score
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-cyan-500">
                  {
                    simulationResults.launchScore
                  }
                  /100
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Competitive Threat
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-orange-500">
                  Medium
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Market Position
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-green-500">
                  Strong
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Audience Match
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-violet-500">
                  82%
                </h2>
              </CardContent>
            </Card>

          </div>

          {/* Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                Product vs Competitors
              </CardTitle>
            </CardHeader>

            <CardContent className="h-[420px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={
                    competitorData
                  }
                >
                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="score"
                    fill="#06b6d4"
                    radius={[
                      8,
                      8,
                      0,
                      0,
                    ]}
                  />

                </BarChart>
              </ResponsiveContainer>

            </CardContent>
          </Card>

          {/* AI Intelligence */}
          <Card>
            <CardHeader>
              <CardTitle>
                AI Competitive Intelligence
              </CardTitle>
            </CardHeader>

            <CardContent>

              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-5">

                <div className="mb-3 flex items-center gap-2">

                  <span className="text-xl">
                    🤖
                  </span>

                  <h3 className="font-semibold">
                    LaunchIQ Strategic Insight
                  </h3>

                </div>

                <p className="leading-7 text-muted-foreground">
                  {getRecommendation()}
                </p>

              </div>

            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
