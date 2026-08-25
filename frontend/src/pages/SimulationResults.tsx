import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Button,
} from '@/components/ui/button'

import {
  supabase,
} from '@/lib/supabase'

import type {
  LaunchInsights,
  SimulationInput,
} from '@/ai'

export function
SimulationResults() {

  const navigate =
    useNavigate()

  const {
    id,
  } =
    useParams()

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    simulationData,
    setSimulationData,
  ] =
    useState<Partial<SimulationInput>>({})

  const [
    simulationResult,
    setSimulationResult,
  ] =
    useState<Partial<LaunchInsights>>({})

  const [
    selectedCharts,
    setSelectedCharts,
  ] =
    useState<string[]>(
      []
    )

  // -----------------------------
  // LOAD SIMULATION
  // -----------------------------
  useEffect(() => {

    async function
      fetchSimulation() {

      try {

        const {
          data,
          error,
        } =
          await supabase
            .from(
              'simulations'
            )
            .select('*')
            .eq(
              'id',
              id
            )
            .single()

        if (error)
          throw error

        // -----------------------------
        // DB DATA
        // -----------------------------
        const dbData =
          data
            ?.simulation_data ||

          {}

        const dbResult =
          data
            ?.simulation_results ||

          {}

        // -----------------------------
// ALWAYS USE DB FIRST
// -----------------------------
setSimulationData(
  dbData
)

setSimulationResult(
  dbResult
)

// -----------------------------
// FALLBACK ONLY
// -----------------------------
if (

  !dbResult
    ?.executiveSummary
) {

  const liveData =
    JSON.parse(

      localStorage.getItem(
        'liveSimulationData'
      ) || '{}'
    )

  const liveResult =
    JSON.parse(

      localStorage.getItem(
        'liveSimulationResult'
      ) || '{}'
    )

  setSimulationData(
    liveData
  )

  setSimulationResult(
    liveResult
  )
}

        // -----------------------------
        // CHARTS
        // -----------------------------
        setSelectedCharts(

          JSON.parse(

            localStorage.getItem(
              'selectedCharts'
            ) || '[]'
          )
        )
      }

      catch (
        error
      ) {

        console.error(
          'Failed to load simulation:',
          error
        )
      }

      finally {

        setLoading(
          false
        )
      }
    }

    if (id) {

      fetchSimulation()
    }

  }, [id])

  // -----------------------------
  // LOADER
  // -----------------------------
  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

          <p className="text-muted-foreground">

            Loading simulation...

          </p>

        </div>

      </div>
    )
  }

  // -----------------------------
  // COLORS
  // -----------------------------
  const sentimentColor =
    simulationResult.sentiment ===
    'Positive'
      ? 'text-green-500'
      : simulationResult.sentiment ===
        'Mixed'
      ? 'text-yellow-500'
      : 'text-red-500'

  const confidenceColor =
    simulationResult.confidence ===
    'High'
      ? 'text-green-500'
      : simulationResult.confidence ===
        'Medium'
      ? 'text-yellow-500'
      : 'text-red-500'

  // -----------------------------
  // AI FIELDS
  // -----------------------------
  const executiveSummary =
    simulationResult
      .executiveSummary ||

    'No executive summary generated.'

  const strategicInsights =
    simulationResult
      .strategicInsights ||

    []

  const marketRisks =
    simulationResult
      .marketRisks ||

    []

  const pricingStrategy =
    simulationResult
      .pricingStrategy ||

    'No pricing strategy available.'

  const competitivePositioning =
    simulationResult
      .competitivePositioning ||

    'No positioning guidance available.'

  const goToMarketStrategy =
    simulationResult
      .goToMarketStrategy ||

    'No GTM strategy available.'

    return (
      <div className="min-h-screen bg-background px-6 py-10">
    
        <div className="mx-auto max-w-7xl space-y-8">
    
          {/* Header */}
          <div>
    
            <h1 className="text-4xl font-bold tracking-tight">
    
              Launch Intelligence Results
    
            </h1>
    
            <p className="mt-2 text-muted-foreground">
    
              AI-generated consulting analysis for{' '}
    
              <span className="font-semibold text-foreground">
    
                {
                  simulationData
                    .productName ||
    
                  'your product'
                }
    
              </span>
    
            </p>
    
          </div>
    
          {/* Metrics */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    
            <Card className="rounded-3xl">
    
              <CardHeader>
    
                <CardTitle>
                  Purchase Likelihood
                </CardTitle>
    
              </CardHeader>
    
              <CardContent>
    
                <h2 className="text-5xl font-bold text-cyan-500">
    
                  {
                    simulationResult
                      .purchaseLikelihood || 0
                  }
                  %
    
                </h2>
    
              </CardContent>
    
            </Card>
    
            <Card className="rounded-3xl">
    
              <CardHeader>
    
                <CardTitle>
                  Launch Risk
                </CardTitle>
    
              </CardHeader>
    
              <CardContent>
    
                <h2 className="text-5xl font-bold text-orange-500">
    
                  {
                    simulationResult
                      .riskScore || 0
                  }
                  %
    
                </h2>
    
              </CardContent>
    
            </Card>
    
            <Card className="rounded-3xl">
    
              <CardHeader>
    
                <CardTitle>
                  Market Sentiment
                </CardTitle>
    
              </CardHeader>
    
              <CardContent>
    
                <h2
                  className={`text-5xl font-bold ${sentimentColor}`}
                >
    
                  {
                    simulationResult
                      .sentiment ||
    
                    'Unknown'
                  }
    
                </h2>
    
              </CardContent>
    
            </Card>
    
            <Card className="rounded-3xl">
    
              <CardHeader>
    
                <CardTitle>
                  Confidence
                </CardTitle>
    
              </CardHeader>
    
              <CardContent>
    
                <h2
                  className={`text-5xl font-bold ${confidenceColor}`}
                >
    
                  {
                    simulationResult
                      .confidence ||
    
                    'Unknown'
                  }
    
                </h2>
    
              </CardContent>
    
            </Card>
    
          </div>
    
          {/* Executive Summary */}
          <Card className="rounded-[32px]">
    
            <CardHeader>
    
              <CardTitle>
                Executive Summary
              </CardTitle>
    
            </CardHeader>
    
            <CardContent>
    
              <p className="leading-8 text-muted-foreground">
    
                {
                  executiveSummary
                }
    
              </p>
    
            </CardContent>
    
          </Card>
    
          {/* Strategic Insights */}
          <Card className="rounded-[32px]">
    
            <CardHeader>
    
              <CardTitle>
                Strategic Insights
              </CardTitle>
    
            </CardHeader>
    
            <CardContent className="space-y-4">
    
              {strategicInsights.map(
                (
                  insight:
                    string,
    
                  index:
                    number
                ) => (
    
                  <div
                    key={index}
                    className="rounded-2xl border bg-muted/30 p-5"
                  >
    
                    {insight}
    
                  </div>
                )
              )}
    
            </CardContent>
    
          </Card>
    
          {/* Market Risks */}
          <Card className="rounded-[32px]">
    
            <CardHeader>
    
              <CardTitle>
                Market Risks
              </CardTitle>
    
            </CardHeader>
    
            <CardContent className="space-y-4">
    
              {marketRisks.map(
                (
                  risk:
                    string,
    
                  index:
                    number
                ) => (
    
                  <div
                    key={index}
                    className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
                  >
    
                    {risk}
    
                  </div>
                )
              )}
    
            </CardContent>
    
          </Card>
    
          {/* Strategy Cards */}
          <div className="grid gap-6 lg:grid-cols-2">
    
            <Card className="rounded-[32px]">
    
              <CardHeader>
    
                <CardTitle>
                  Pricing Strategy
                </CardTitle>
    
              </CardHeader>
    
              <CardContent>
    
                <p className="leading-8 text-muted-foreground">
    
                  {
                    pricingStrategy
                  }
    
                </p>
    
              </CardContent>
    
            </Card>
    
            <Card className="rounded-[32px]">
    
              <CardHeader>
    
                <CardTitle>
                  Competitive Positioning
                </CardTitle>
    
              </CardHeader>
    
              <CardContent>
    
                <p className="leading-8 text-muted-foreground">
    
                  {
                    competitivePositioning
                  }
    
                </p>
    
              </CardContent>
    
            </Card>
    
          </div>
    
          {/* GTM */}
          <Card className="rounded-[32px]">
    
            <CardHeader>
    
              <CardTitle>
                Go-To-Market Strategy
              </CardTitle>
    
            </CardHeader>
    
            <CardContent>
    
              <p className="leading-8 text-muted-foreground">
    
                {
                  goToMarketStrategy
                }
    
              </p>
    
            </CardContent>
    
          </Card>
    
          {/* Recommendations */}
          <Card className="rounded-[32px]">
    
            <CardHeader>
    
              <CardTitle>
                AI Recommended Actions
              </CardTitle>
    
            </CardHeader>
    
            <CardContent className="space-y-4">
    
              {(
                simulationResult
                  .recommendations ||
    
                []
              ).map(
    
                (
                  recommendation:
                    string,
    
                  index:
                    number
                ) => (
    
                  <div
                    key={index}
                    className="rounded-2xl border bg-muted/30 p-5"
                  >
    
                    {recommendation}
    
                  </div>
                )
              )}
    
            </CardContent>
    
          </Card>

                {/* Recommended Intelligence Modules */}
      <Card className="rounded-[32px]">

<CardHeader>

  <CardTitle>
    Recommended Intelligence Modules
  </CardTitle>

</CardHeader>

<CardContent>

  <div className="flex flex-wrap gap-3">

    {selectedCharts.map(
      (
        chart,
        index
      ) => (

        <div
          key={index}
          className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-400"
        >

          {chart}

        </div>
      )
    )}

  </div>

</CardContent>

</Card>

{/* Action Buttons */}
<div className="flex flex-wrap gap-4">

<Button
  size="lg"
  className="rounded-2xl"
  onClick={() =>
    navigate(
      '/app/insights'
    )
  }
>

  Open Insights Dashboard

</Button>

<Button
  size="lg"
  variant="secondary"
  className="rounded-2xl"
  onClick={() =>
    navigate(
      '/app/history'
    )
  }
>

  Simulation History

</Button>

<Button
  size="lg"
  variant="outline"
  className="rounded-2xl"
  onClick={() =>
    navigate(
      '/app/new-simulation'
    )
  }
>

  Run Another Simulation

</Button>

</div>

</div>

</div>
)
}
