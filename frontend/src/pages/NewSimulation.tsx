import {
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import {
  GradientButton,
} from '@/components/common/GradientButton'

import {
  runSimulation,
} from '@/simulation/simulationEngine'

import {
  supabase,
} from '@/lib/supabase'

import {
  useAuth,
} from '@/context/AuthContext'

export default function
NewSimulation() {

  const navigate =
    useNavigate()

  const {
    user,
  } =
    useAuth()

  const [
    loading,
    setLoading,
  ] =
    useState(false)

  const [
    formData,
    setFormData,
  ] =
    useState({

      productName:
        '',

      category:
        '',

      industry:
        '',

      audience:
        '',

      price:
        '',

      region:
        '',

      features:
        '',

      competitors:
        '',

      launchGoal:
        '',
    })

  // -----------------------------
  // INPUT CHANGE
  // -----------------------------
  const handleChange =
    (
      e:
      React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >
    ) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      })
    }

  // -----------------------------
  // SMART CHART ENGINE
  // -----------------------------
  const getRecommendedCharts =
    () => {

      const charts =
        new Set<string>()

      const category =
        formData.category
          .toLowerCase()

      const industry =
        formData.industry
          .toLowerCase()

      const audience =
        formData.audience
          .toLowerCase()

      const features =
        formData.features
          .toLowerCase()

      const numericPrice =
        Number(

          formData.price
            .replace(
              /\D/g,
              ''
            )
        ) || 0

      charts.add(
        'Demand Forecast'
      )

      charts.add(
        'Consumer Segments'
      )

      charts.add(
        'AI Recommendations'
      )

      charts.add(
        'Revenue Projection'
      )

      if (
        category.includes(
          'protein'
        ) ||

        category.includes(
          'fitness'
        ) ||

        audience.includes(
          'gym'
        ) ||

        industry.includes(
          'health'
        )
      ) {

        charts.add(
          'Price Sensitivity Curve'
        )

        charts.add(
          'Competitor Benchmark'
        )

        charts.add(
          'Persona Analysis'
        )

        charts.add(
          'Product Strength Radar'
        )
      }

      if (
        industry.includes(
          'fmcg'
        ) ||

        category.includes(
          'beverage'
        ) ||

        category.includes(
          'food'
        )
      ) {

        charts.add(
          'Geographic Interest'
        )

        charts.add(
          'Launch Risk Score'
        )

        charts.add(
          'Market Sentiment'
        )
      }

      if (
        industry.includes(
          'saas'
        ) ||

        category.includes(
          'software'
        ) ||

        category.includes(
          'app'
        )
      ) {

        charts.add(
          'Purchase Funnel'
        )

        charts.add(
          'Marketing Channel Performance'
        )

        charts.add(
          'Feature Preference Ranking'
        )
      }

      if (
        numericPrice > 100
      ) {

        charts.add(
          'Price Sensitivity Curve'
        )
      }

      if (
        formData.competitors
      ) {

        charts.add(
          'Competitor Benchmark'
        )
      }

      if (
        features.includes(
          'premium'
        ) ||

        features.includes(
          'ai'
        )
      ) {

        charts.add(
          'SWOT Intelligence'
        )

        charts.add(
          'Product Strength Radar'
        )
      }

      return Array.from(
        charts
      )
    }

    // -----------------------------
// RUN SIMULATION
// -----------------------------
const handleSimulation =
async () => {

  if (!user) {

    alert(
      'Please login first.'
    )

    navigate(
      '/app/auth'
    )

    return
  }

  try {

    setLoading(
      true
    )

    const simulationInput =
      {

        productName:
          formData.productName,

        category:
          formData.category,

        industry:
          formData.industry,

        targetAudience:
          formData.audience,

        price:
          formData.price,

        marketRegion:
          formData.region,

        productFeatures:
          formData.features,

        competitors:
          formData.competitors,

        launchGoal:
          formData.launchGoal,
      }

    // -----------------------------
    // RUN AI ENGINE
    // -----------------------------
    const simulationResult =
      await runSimulation(
        simulationInput
      )

    // -----------------------------
    // SAVE TO LOCAL STORAGE
    // -----------------------------
    localStorage.setItem(
      'simulationData',
      JSON.stringify(
        simulationInput
      )
    )

    localStorage.setItem(
      'simulationResult',
      JSON.stringify(
        simulationResult
      )
    )

    // LIVE RESULT
    localStorage.setItem(
      'liveSimulationData',
      JSON.stringify(
        simulationInput
      )
    )

    localStorage.setItem(
      'liveSimulationResult',
      JSON.stringify(
        simulationResult
      )
    )

    // -----------------------------
    // CHARTS
    // -----------------------------
    const recommendedCharts =
      getRecommendedCharts()

    localStorage.setItem(
      'selectedCharts',
      JSON.stringify(
        recommendedCharts
      )
    )

    // -----------------------------
    // SAVE TO SUPABASE
    // -----------------------------
    const {
      data: savedSimulation,
      error,
    } =
      await supabase
        .from(
          'simulations'
        )
        .insert({

          user_id:
            user.id,

          product_name:
            formData.productName,

          price:
            formData.price,

          audience:
            formData.audience,

          purchase_intent:
            simulationResult.purchaseLikelihood,

          market_sentiment:
            simulationResult.sentiment,

          risk_score:
            simulationResult.riskScore,

          launch_score:
            simulationResult.confidence ===
            'High'
              ? 90
              : simulationResult.confidence ===
                'Medium'
              ? 70
              : 50,

          simulation_data:
            simulationInput,

          simulation_results:
            simulationResult,
        })

        .select()

        .single()

    if (error) {

      console.error(
        'SUPABASE INSERT ERROR:',
        error
      )

      alert(

        JSON.stringify(
          error,
          null,
          2
        )
      )

      setLoading(
        false
      )

      return
    }

    // -----------------------------
    // LOCAL HISTORY BACKUP
    // -----------------------------
    const previousSimulations =
      JSON.parse(

        localStorage.getItem(
          'simulationHistory'
        ) || '[]'
      )

    const simulationRecord =
      {

        id:
          Date.now(),

        productName:
          formData.productName,

        category:
          formData.category,

        industry:
          formData.industry,

        audience:
          formData.audience,

        price:
          formData.price,

        purchaseLikelihood:
          simulationResult.purchaseLikelihood,

        riskScore:
          simulationResult.riskScore,

        sentiment:
          simulationResult.sentiment,

        confidence:
          simulationResult.confidence,

        launchScore:
          simulationResult.confidence ===
          'High'
            ? 90
            : simulationResult.confidence ===
              'Medium'
            ? 70
            : 50,
      }

    previousSimulations.push(
      simulationRecord
    )

    localStorage.setItem(
      'simulationHistory',

      JSON.stringify(
        previousSimulations
      )
    )

    setLoading(
      false
    )

    // -----------------------------
    // NAVIGATE
    // -----------------------------
    navigate(
      `/app/simulation-results/${savedSimulation.id}`
    )
  }

  catch (
    error
  ) {

    console.error(
      'SIMULATION ERROR:',
      error
    )

    alert(

      JSON.stringify(
        error,
        null,
        2
      )
    )

    setLoading(
      false
    )
  }
}

return (
  <div className="min-h-screen bg-background px-6 py-10">

    <div className="mx-auto max-w-5xl">

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold tracking-tight">
          New Product Simulation
        </h1>

        <p className="mt-2 text-muted-foreground">

          Enter product details
          and let LaunchIQ.ai
          simulate consumer
          response, launch risk,
          sentiment, and success probability.

        </p>

      </div>

      {/* Form */}
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

        <div className="grid gap-6 md:grid-cols-2">

          {/* Product Name */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="productName"
              value={
                formData.productName
              }
              onChange={
                handleChange
              }
              placeholder="e.g ProteinX"
              className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
            />

          </div>

          {/* Category */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
              placeholder="e.g Beverage"
              className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
            />

          </div>

          {/* Industry */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Industry
            </label>

            <input
              type="text"
              name="industry"
              value={
                formData.industry
              }
              onChange={
                handleChange
              }
              placeholder="e.g FMCG"
              className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
            />

          </div>

          {/* Audience */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Target Audience
            </label>

            <input
              type="text"
              name="audience"
              value={
                formData.audience
              }
              onChange={
                handleChange
              }
              placeholder="e.g Students, Gym Users"
              className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
            />

          </div>

          {/* Price */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Price
            </label>

            <input
              type="text"
              name="price"
              value={
                formData.price
              }
              onChange={
                handleChange
              }
              placeholder="e.g ₹120"
              className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
            />

          </div>

          {/* Region */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Market Region
            </label>

            <input
              type="text"
              name="region"
              value={
                formData.region
              }
              onChange={
                handleChange
              }
              placeholder="e.g India"
              className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
            />

          </div>

        </div>

        {/* Features */}
        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium">
            Product Features
          </label>

          <textarea
            rows={4}
            name="features"
            value={
              formData.features
            }
            onChange={
              handleChange
            }
            placeholder="e.g High protein, low sugar, premium packaging"
            className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
          />

        </div>

        {/* Competitors */}
        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium">
            Competitors
          </label>

          <textarea
            rows={3}
            name="competitors"
            value={
              formData.competitors
            }
            onChange={
              handleChange
            }
            placeholder="e.g Amul Protein, MuscleBlaze"
            className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
          />

        </div>

        {/* Launch Goal */}
        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium">
            Launch Goal
          </label>

          <textarea
            rows={3}
            name="launchGoal"
            value={
              formData.launchGoal
            }
            onChange={
              handleChange
            }
            placeholder="e.g Maximize market adoption"
            className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:ring-2 focus:ring-primary"
          />

        </div>

        {/* Loader */}
        {loading && (

          <div className="mt-8 overflow-hidden rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">

            <p className="animate-pulse text-sm font-semibold text-cyan-400">

              Running Launch Intelligence...

            </p>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">

              <p>
                Analyzing market...
              </p>

              <p>
                Evaluating competitors...
              </p>

              <p>
                Predicting adoption...
              </p>

              <p>
                Generating AI strategy...
              </p>

            </div>

          </div>
        )}

        {/* CTA */}
        <div className="mt-8 flex justify-center">

          <GradientButton
            onClick={
              handleSimulation
            }
            size="lg"
            disabled={loading}
            className="px-10 py-6 text-lg"
          >

            {loading
              ? 'Running Simulation...'
              : 'Run Launch Intelligence'}

          </GradientButton>

        </div>

      </div>

    </div>

  </div>
)
}
