import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  AreaChart,
  Area,
} from 'recharts'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import { exportLaunchReport } from '@/utils/exportReport'

export function InsightsPage() {

  // --------------------------------
  // LOAD DATA
  // --------------------------------

  const selectedCharts =
    JSON.parse(
      localStorage.getItem(
        'selectedCharts'
      ) || '[]'
    )

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

  // --------------------------------
  // SAFE VALUES
  // --------------------------------

  const category =
    simulationData.category
      ?.toLowerCase() || ''

  const industry =
    simulationData.industry
      ?.toLowerCase() || ''

  const audience =
    (
      simulationData
        .targetAudience ||
      simulationData
        .audience ||
      ''
    ).toLowerCase()

  const features =
    (
      simulationData
        .productFeatures ||
      simulationData
        .features ||
      ''
    ).toLowerCase()

  const price =
    Number(
      simulationData.price?.replace(
        /\D/g,
        ''
      )
    ) || 0

  const purchaseLikelihood =
    simulationResult
      .purchaseLikelihood || 65

  const riskScore =
    simulationResult
      .riskScore || 40

  const sentiment =
    simulationResult
      .sentiment || 'Mixed'

  const confidence =
    simulationResult
      .confidence || 'Medium'

  // --------------------------------
  // DEMAND FORECAST
  // --------------------------------

  const demandBase =
    purchaseLikelihood

  const demandData = [
    {
      month: 'Jan',
      demand:
        demandBase - 28,
    },

    {
      month: 'Feb',
      demand:
        demandBase - 15,
    },

    {
      month: 'Mar',
      demand:
        demandBase - 5,
    },

    {
      month: 'Apr',
      demand:
        demandBase + 8,
    },

    {
      month: 'May',
      demand:
        demandBase + 20,
    },
  ]

  // --------------------------------
  // AUDIENCE SEGMENTS
  // --------------------------------

  const audienceData =
    audience.includes('gym')
      ? [
          {
            name:
              'Gym Users',
            value: 65,
          },
          {
            name:
              'Professionals',
            value: 20,
          },
          {
            name:
              'Students',
            value: 15,
          },
        ]
      : audience.includes(
          'student'
        )
      ? [
          {
            name:
              'Students',
            value: 70,
          },
          {
            name:
              'Young Adults',
            value: 20,
          },
          {
            name:
              'Professionals',
            value: 10,
          },
        ]
      : [
          {
            name:
              'Professionals',
            value: 45,
          },
          {
            name:
              'Students',
            value: 30,
          },
          {
            name:
              'Families',
            value: 25,
          },
        ]

  // --------------------------------
  // COMPETITOR BENCHMARK
  // --------------------------------

  const competitorData =
    [
      {
        name:
          'Your Product',

        score:
          purchaseLikelihood,
      },

      {
        name:
          'Competitor A',

        score:
          Math.max(
            purchaseLikelihood -
              12,
            20
          ),
      },

      {
        name:
          'Competitor B',

        score:
          Math.max(
            purchaseLikelihood -
              22,
            15
          ),
      },
    ]

  // --------------------------------
  // PRODUCT STRENGTH RADAR
  // --------------------------------

  const radarData =
    [
      {
        subject:
          'Market Fit',

        score:
          purchaseLikelihood,
      },

      {
        subject:
          'Pricing',

        score:
          price > 500
            ? 65
            : 88,
      },

      {
        subject:
          'Innovation',

        score:
          features.includes(
            'ai'
          )
            ? 95
            : features.includes(
                'premium'
              )
            ? 85
            : 75,
      },

      {
        subject:
          'Brand Appeal',

        score:
          sentiment ===
          'Positive'
            ? 90
            : sentiment ===
              'Mixed'
            ? 75
            : 60,
      },

      {
        subject:
          'Risk',

        score:
          100 -
          riskScore,
      },
    ]

  // --------------------------------
  // REVENUE FORECAST
  // --------------------------------

  const revenueBase =
    purchaseLikelihood *
    1400

  const revenueData =
    [
      {
        month: 'Jan',
        revenue:
          revenueBase,
      },

      {
        month: 'Feb',
        revenue:
          revenueBase *
          1.45,
      },

      {
        month: 'Mar',
        revenue:
          revenueBase *
          1.9,
      },

      {
        month: 'Apr',
        revenue:
          revenueBase *
          2.4,
      },

      {
        month: 'May',
        revenue:
          revenueBase *
          3.1,
      },
    ]

    return (
      <div className="space-y-8 p-6">
    
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    
          <div>
    
            <h1 className="text-4xl font-bold tracking-tight">
              AI Insights Dashboard
            </h1>
    
            <p className="text-muted-foreground">
    
              Dynamic launch intelligence
              for{' '}
    
              <span className="font-medium text-foreground">
    
                {simulationData.productName ||
                  'your product'}
    
              </span>
    
            </p>
    
          </div>
    
          <Button
            onClick={() =>
              exportLaunchReport()
            }
            className="rounded-2xl px-6"
          >
            Download AI PDF Report
          </Button>
    
        </div>
    
        {/* KPI Cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    
          {/* Purchase Likelihood */}
          <Card className="rounded-[28px]">
    
            <CardHeader>
    
              <CardTitle>
                Purchase Likelihood
              </CardTitle>
    
            </CardHeader>
    
            <CardContent>
    
              <h2 className="text-5xl font-bold text-cyan-400">
    
                {
                  purchaseLikelihood
                }
                %
    
              </h2>
    
              <p className="mt-2 text-sm text-muted-foreground">
                Estimated consumer
                purchase probability
              </p>
    
            </CardContent>
    
          </Card>
    
          {/* Risk Score */}
          <Card className="rounded-[28px]">
    
            <CardHeader>
    
              <CardTitle>
                Launch Risk
              </CardTitle>
    
            </CardHeader>
    
            <CardContent>
    
              <h2 className="text-5xl font-bold text-orange-400">
    
                {riskScore}
                %
    
              </h2>
    
              <p className="mt-2 text-sm text-muted-foreground">
                Product launch risk
                evaluation
              </p>
    
            </CardContent>
    
          </Card>
    
          {/* Sentiment */}
          <Card className="rounded-[28px]">
    
            <CardHeader>
    
              <CardTitle>
                Market Sentiment
              </CardTitle>
    
            </CardHeader>
    
            <CardContent>
    
              <h2
                className={`text-5xl font-bold ${
                  sentiment ===
                  'Positive'
                    ? 'text-green-400'
                    : sentiment ===
                      'Mixed'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}
              >
    
                {sentiment}
    
              </h2>
    
              <p className="mt-2 text-sm text-muted-foreground">
                Predicted consumer
                emotional response
              </p>
    
            </CardContent>
    
          </Card>
    
          {/* Confidence */}
          <Card className="rounded-[28px]">
    
            <CardHeader>
    
              <CardTitle>
                Launch Confidence
              </CardTitle>
    
            </CardHeader>
    
            <CardContent>
    
              <h2
                className={`text-5xl font-bold ${
                  confidence ===
                  'High'
                    ? 'text-green-400'
                    : confidence ===
                      'Medium'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}
              >
    
                {confidence}
    
              </h2>
    
              <p className="mt-2 text-sm text-muted-foreground">
                AI confidence in
                launch success
              </p>
    
            </CardContent>
    
          </Card>
    
        </div>
    
        {/* AI Intelligence */}
        <Card className="rounded-[32px]">
    
          <CardHeader>
    
            <CardTitle>
              AI Intelligence Summary
            </CardTitle>
    
          </CardHeader>
    
          <CardContent className="space-y-4">
    
            <div className="rounded-2xl border p-5">
    
              <h3 className="font-semibold">
                Audience Fit
              </h3>
    
              <p className="mt-2 text-muted-foreground">
    
                {audience.includes(
                  'student'
                )
                  ? 'Student-focused product strategy detected.'
                  : audience.includes(
                      'gym'
                    )
                  ? 'Strong fitness consumer targeting.'
                  : 'Broad consumer targeting detected.'}
    
              </p>
    
            </div>
    
            <div className="rounded-2xl border p-5">
    
              <h3 className="font-semibold">
                Pricing Intelligence
              </h3>
    
              <p className="mt-2 text-muted-foreground">
    
                {price > 500
                  ? 'Premium pricing may reduce adoption but improve margins.'
                  : 'Pricing appears affordable for broader adoption.'}
    
              </p>
    
            </div>
    
            <div className="rounded-2xl border p-5">
    
              <h3 className="font-semibold">
                Market Opportunity
              </h3>
    
              <p className="mt-2 text-muted-foreground">
    
                {purchaseLikelihood >=
                75
                  ? 'Strong launch opportunity detected.'
                  : 'Moderate market opportunity with optimization potential.'}
    
              </p>
    
            </div>
    
          </CardContent>
    
        </Card>
    
        {/* Price Sensitivity */}
        {selectedCharts.includes(
          'Price Sensitivity Curve'
        ) && (
    
          <Card
            id="price-chart"
            className="rounded-[32px]"
          >
    
            <CardHeader>
    
              <CardTitle>
                Price Sensitivity
              </CardTitle>
    
            </CardHeader>
    
            <CardContent className="h-[320px]">
    
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
    
                <LineChart
                  data={[
                    {
                      price:
                        'Low',
    
                      interest:
                        95,
                    },
    
                    {
                      price:
                        'Current',
    
                      interest:
                        purchaseLikelihood,
                    },
    
                    {
                      price:
                        'Premium',
    
                      interest:
                        Math.max(
                          purchaseLikelihood -
                            20,
                          20
                        ),
                    },
                  ]}
                >
    
                  <XAxis
                    dataKey="price"
                  />
    
                  <YAxis />
    
                  <Tooltip />
    
                  <Line
                    type="monotone"
                    dataKey="interest"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                  />
    
                </LineChart>
    
              </ResponsiveContainer>
    
            </CardContent>
    
          </Card>
    
        )}
    
        {/* Dynamic Charts */}
        <div className="grid gap-6 lg:grid-cols-2">

      {/* Demand Forecast */}
      {selectedCharts.includes(
        'Demand Forecast'
      ) && (

        <Card
          id="demand-chart"
          className="rounded-[32px]"
        >

          <CardHeader>

            <CardTitle>
              Demand Forecast
            </CardTitle>

          </CardHeader>

          <CardContent className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={demandData}
              >

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </CardContent>

        </Card>

      )}

      {/* Consumer Segments */}
      {selectedCharts.includes(
        'Consumer Segments'
      ) && (

        <Card
          id="consumer-chart"
          className="rounded-[32px]"
        >

          <CardHeader>

            <CardTitle>
              Consumer Segments
            </CardTitle>

          </CardHeader>

          <CardContent className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={
                    audienceData
                  }
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >

                  <Cell fill="#8b5cf6" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ec4899" />

                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </CardContent>

        </Card>

      )}

      {/* Competitor Benchmark */}
      {selectedCharts.includes(
        'Competitor Benchmark'
      ) && (

        <Card
          id="competitor-chart"
          className="rounded-[32px]"
        >

          <CardHeader>

            <CardTitle>
              Competitor Benchmark
            </CardTitle>

          </CardHeader>

          <CardContent className="h-[320px]">

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
                  fill="#8b5cf6"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </CardContent>

        </Card>

      )}

      {/* Product Strength Radar */}
      {selectedCharts.includes(
        'Product Strength Radar'
      ) && (

        <Card
          id="radar-chart"
          className="rounded-[32px]"
        >

          <CardHeader>

            <CardTitle>
              Product Strength Radar
            </CardTitle>

          </CardHeader>

          <CardContent className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <RadarChart
                data={radarData}
              >

                <PolarGrid />

                <PolarAngleAxis
                  dataKey="subject"
                />

                <Radar
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={
                    0.5
                  }
                />

              </RadarChart>

            </ResponsiveContainer>

          </CardContent>

        </Card>

      )}

      {/* Revenue Projection */}
      {selectedCharts.includes(
        'Revenue Projection'
      ) && (

        <Card
          id="revenue-chart"
          className="rounded-[32px]"
        >

          <CardHeader>

            <CardTitle>
              Revenue Projection
            </CardTitle>

          </CardHeader>

          <CardContent className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={
                  revenueData
                }
              >

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                />

              </AreaChart>

            </ResponsiveContainer>

          </CardContent>

        </Card>

      )}

      {/* AI Recommendation Panel */}
      <Card className="rounded-[32px] lg:col-span-2">

        <CardHeader>

          <CardTitle>
            AI Strategic Recommendations
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4">

          {(
            simulationResult.recommendations ||
            []
          ).map(
            (
              recommendation: string,
              index: number
            ) => (

              <div
                key={index}
                className="rounded-2xl border border-border bg-muted/40 p-5"
              >

                <p className="leading-7">
                  🚀{' '}
                  {
                    recommendation
                  }
                </p>

              </div>

            )
          )}

        </CardContent>

      </Card>

    </div>
  </div>
)
}
