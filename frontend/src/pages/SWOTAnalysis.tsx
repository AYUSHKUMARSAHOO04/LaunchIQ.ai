import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { generateSWOT } from '@/simulation/swotEngine'

export default function SWOTAnalysis() {

  // -----------------------------
  // LOAD DATA
  // -----------------------------

  const simulationData =
    JSON.parse(
      localStorage.getItem(
        'simulationData'
      ) || '{}'
    )

  const simulationResult =
    JSON.parse(
      localStorage.getItem(
        'simulationResult'
      ) || '{}'
    )

  // -----------------------------
  // AI SWOT ENGINE
  // -----------------------------

  const {
    strengths,
    weaknesses,
    opportunities,
    threats,
  } = generateSWOT(
    simulationData,
    simulationResult
  )

  return (
    <div className="min-h-screen bg-background p-6">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div>

          <h1 className="text-4xl font-bold tracking-tight">
            AI SWOT Analysis
          </h1>

          <p className="mt-2 text-muted-foreground">

            AI-generated strategic
            strengths, weaknesses,
            opportunities, and threats
            for{' '}

            <span className="font-medium text-foreground">
              {simulationData.productName ||
                'your product'}
            </span>

          </p>

        </div>

        {/* Product Summary */}
        <Card className="rounded-[30px]">

          <CardHeader>

            <CardTitle>
              Product Intelligence Summary
            </CardTitle>

          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border p-5">

              <h3 className="font-semibold">
                Purchase Likelihood
              </h3>

              <p className="mt-2 text-3xl font-bold text-cyan-400">

                {
                  simulationResult.purchaseLikelihood
                }
                %

              </p>

            </div>

            <div className="rounded-2xl border p-5">

              <h3 className="font-semibold">
                Risk Score
              </h3>

              <p className="mt-2 text-3xl font-bold text-orange-400">

                {
                  simulationResult.riskScore
                }
                %

              </p>

            </div>

            <div className="rounded-2xl border p-5">

              <h3 className="font-semibold">
                Sentiment
              </h3>

              <p className="mt-2 text-3xl font-bold text-violet-400">

                {
                  simulationResult.sentiment
                }

              </p>

            </div>

            <div className="rounded-2xl border p-5">

              <h3 className="font-semibold">
                Confidence
              </h3>

              <p className="mt-2 text-3xl font-bold text-green-400">

                {
                  simulationResult.confidence
                }

              </p>

            </div>

          </CardContent>

        </Card>

        {/* SWOT Grid */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Strengths */}
          <Card className="rounded-[30px] border-green-500/20 bg-green-500/5">

            <CardHeader>

              <CardTitle className="text-green-400">
                Strengths
              </CardTitle>

            </CardHeader>

            <CardContent>

              <ul className="space-y-3">

                {strengths.map(
                  (
                    item: string,
                    index: number
                  ) => (

                    <li
                      key={index}
                      className="rounded-2xl border border-green-500/20 bg-background/50 p-4 text-sm leading-6"
                    >
                      ✅ {item}
                    </li>

                  )
                )}

              </ul>

            </CardContent>

          </Card>

          {/* Weaknesses */}
          <Card className="rounded-[30px] border-red-500/20 bg-red-500/5">

            <CardHeader>

              <CardTitle className="text-red-400">
                Weaknesses
              </CardTitle>

            </CardHeader>

            <CardContent>

              <ul className="space-y-3">

                {weaknesses.map(
                  (
                    item: string,
                    index: number
                  ) => (

                    <li
                      key={index}
                      className="rounded-2xl border border-red-500/20 bg-background/50 p-4 text-sm leading-6"
                    >
                      ⚠️ {item}
                    </li>

                  )
                )}

              </ul>

            </CardContent>

          </Card>

          {/* Opportunities */}
          <Card className="rounded-[30px] border-cyan-500/20 bg-cyan-500/5">

            <CardHeader>

              <CardTitle className="text-cyan-400">
                Opportunities
              </CardTitle>

            </CardHeader>

            <CardContent>

              <ul className="space-y-3">

                {opportunities.map(
                  (
                    item: string,
                    index: number
                  ) => (

                    <li
                      key={index}
                      className="rounded-2xl border border-cyan-500/20 bg-background/50 p-4 text-sm leading-6"
                    >
                      🚀 {item}
                    </li>

                  )
                )}

              </ul>

            </CardContent>

          </Card>

          {/* Threats */}
          <Card className="rounded-[30px] border-orange-500/20 bg-orange-500/5">

            <CardHeader>

              <CardTitle className="text-orange-400">
                Threats
              </CardTitle>

            </CardHeader>

            <CardContent>

              <ul className="space-y-3">

                {threats.map(
                  (
                    item: string,
                    index: number
                  ) => (

                    <li
                      key={index}
                      className="rounded-2xl border border-orange-500/20 bg-background/50 p-4 text-sm leading-6"
                    >
                      ⚡ {item}
                    </li>

                  )
                )}

              </ul>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  )
}
