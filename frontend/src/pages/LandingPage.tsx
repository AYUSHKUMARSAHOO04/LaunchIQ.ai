import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  ArrowRight,
  Brain,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function LandingPage() {

  const [showSigninPopup, setShowSigninPopup] =
    useState(false)

  const features = [
    {
      icon: Brain,
      title:
        'AI Consumer Simulation',

      description:
        'Simulate customer reactions before launch and predict demand, adoption, and audience behavior using AI.',
    },

    {
      icon: TrendingUp,
      title:
        'Launch Intelligence',

      description:
        'Forecast launch success, market sentiment, consumer intent, and demand before investing budget.',
    },

    {
      icon: BarChart3,
      title:
        'Competitor Intelligence',

      description:
        'Benchmark products against competitors and identify pricing, positioning, and differentiation opportunities.',
    },

    {
      icon: Target,
      title:
        'AI SWOT Analysis',

      description:
        'Automatically generate strengths, weaknesses, opportunities, and threats for strategic launch planning.',
    },

    {
      icon: ShieldCheck,
      title:
        'Launch Risk Prediction',

      description:
        'Identify market risks, adoption barriers, and launch vulnerabilities before market entry.',
    },

    {
      icon: Sparkles,
      title:
        'AI Product Advisor',

      description:
        'Ask LaunchIQ AI anything about pricing, positioning, audience fit, or launch strategy 24×7.',
    },
  ]

  const intelligence = [
    'Consumer Purchase Intent Analysis',
    'Market Sentiment Forecasting',
    'Launch Risk Detection',
    'Pricing Intelligence',
    'Competitive Positioning',
    'Audience Match Score',
    'Demand Prediction',
    'Brand Perception Insights',
    'Market Readiness Score',
  ]

  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* Navbar */}
      

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_35%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-36 text-center">

          <div className="mb-6 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            Trusted By Product Teams & Founders
          </div>

          <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">

            Predict Product

            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              {' '}Launch Success{' '}
            </span>

            Before You Launch

          </h1>

          <p className="mt-8 max-w-3xl text-lg text-slate-300 md:text-xl">

            LaunchIQ.ai helps teams predict
            consumer reactions, benchmark
            competitors, analyze launch risks,
            generate SWOT insights, and optimize
            product launches using AI-powered intelligence.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <Button
              size="lg"
              asChild
              className="rounded-2xl px-10 py-6 text-lg"
            >
              <Link to="/app/new-simulation">
                Start Free Simulation
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>

          </div>

          {/* Stats */}
          <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-xl">

<h2 className="text-4xl font-bold text-cyan-400">
  94%
</h2>

<p className="mt-2 text-slate-400">
  Launch prediction accuracy
</p>

</Card>

<Card className="rounded-[28px] border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-xl">

<h2 className="text-4xl font-bold text-violet-400">
  8k+
</h2>

<p className="mt-2 text-slate-400">
  Product simulations
</p>

</Card>

<Card className="rounded-[28px] border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-xl">

<h2 className="text-4xl font-bold text-emerald-400">
  350+
</h2>

<p className="mt-2 text-slate-400">
  Products analyzed
</p>

</Card>

</div>

</div>
</section>

{/* Features */}
<section
id="features"
className="mx-auto max-w-7xl px-6 py-32"
>

<div className="mb-16 text-center">

<div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
Powerful Features
</div>

<h2 className="text-4xl font-bold md:text-5xl">
Everything You Need To
Predict Launch Success
</h2>

<p className="mx-auto mt-5 max-w-2xl text-slate-400">
AI-powered launch intelligence
for smarter product decisions.
</p>

</div>

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

{features.map(
(
feature,
index
) => {
const Icon =
  feature.icon

return (
  <Card
    key={index}
    className="group rounded-[30px] border border-white/10 bg-slate-900/60 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-500/30 hover:bg-slate-900"
  >

    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20">

      <Icon className="size-7 text-cyan-400" />

    </div>

    <h3 className="text-xl font-semibold">
      {feature.title}
    </h3>

    <p className="mt-3 leading-7 text-slate-400">
      {feature.description}
    </p>

  </Card>
)
}
)}

</div>

</section>

{/* How It Works */}
<section
id="how-it-works"
className="border-y border-white/10 bg-slate-950/50 py-32"
>

<div className="mx-auto max-w-7xl px-6">

<div className="mb-16 text-center">

<div className="mb-4 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
How It Works
</div>

<h2 className="text-4xl font-bold md:text-5xl">
Product Intelligence
In 4 Steps
</h2>

</div>

<div className="grid gap-6 lg:grid-cols-4">

{[
{
  step: '01',

  title:
    'Create Product Simulation',

  description:
    'Enter product name, category, pricing, audience, positioning, and launch information.',
},

{
  step: '02',

  title:
    'AI Market Prediction',

  description:
    'LaunchIQ predicts customer sentiment, purchase intent, launch readiness, and adoption probability.',
},

{
  step: '03',

  title:
    'Generate Intelligence',

  description:
    'Receive competitor benchmarking, SWOT analysis, pricing intelligence, and strategic recommendations.',
},

{
  step: '04',

  title:
    'Launch With Confidence',

  description:
    'Optimize product strategy, pricing, and positioning before entering the market.',
},

].map((item) => (

<Card
  key={item.step}
  className="rounded-[30px] border border-white/10 bg-slate-900/60 p-8"
>

  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-lg font-bold text-white">
    {item.step}
  </div>

  <h3 className="text-xl font-semibold">
    {item.title}
  </h3>

  <p className="mt-3 leading-7 text-slate-400">
    {item.description}
  </p>

</Card>

))}

</div>

</div>

</section>

{/* Intelligence */}
<section
id="intelligence"
className="mx-auto max-w-7xl px-6 py-32"
>

<div className="mb-16 text-center">

<div className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
Launch Intelligence
</div>

<h2 className="text-4xl font-bold md:text-5xl">
AI Intelligence That
Drives Smarter Decisions
</h2>

<p className="mx-auto mt-5 max-w-3xl text-slate-400">

LaunchIQ combines predictive
analytics, market intelligence,
and AI-driven insights to
reduce uncertainty before launch.

</p>

</div>

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

{intelligence.map(
(
item,
index
) => (

<Card
  key={index}
  className="rounded-[30px] border border-white/10 bg-slate-900/60 p-8 transition hover:border-cyan-500/20"
>

  <h3 className="text-xl font-semibold text-cyan-400">
    {item}
  </h3>

  <p className="mt-3 leading-7 text-slate-400">

    LaunchIQ uses predictive
    AI models to generate
    market intelligence and
    strategic product insights
    before launch.

  </p>

</Card>

)
)}

</div>

</section>
      {/* Testimonials */}
      <section className="border-y border-white/10 bg-slate-950/50 py-32">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-16 text-center">

            <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Trusted By Teams
            </div>

            <h2 className="text-4xl font-bold md:text-5xl">
              Why Teams Love LaunchIQ
            </h2>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {[
              {
                name:
                  'Sarah Chen',

                role:
                  'Product Manager',

                quote:
                  'LaunchIQ helped us validate pricing, audience fit, and launch strategy before launch.',
              },

              {
                name:
                  'David Morgan',

                role:
                  'Strategy Consultant',

                quote:
                  'Competitor intelligence gave immediate clarity into positioning and market gaps.',
              },

              {
                name:
                  'Priya Sharma',

                role:
                  'Startup Founder',

                quote:
                  'The SWOT analysis feels like having a business consultant available 24×7.',
              },

            ].map((user) => (

              <Card
                key={user.name}
                className="rounded-[30px] border border-white/10 bg-slate-900/60 p-8"
              >

                <p className="leading-8 text-slate-300">
                  “{user.quote}”
                </p>

                <div className="mt-6">

                  <h3 className="font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {user.role}
                  </p>

                </div>

              </Card>

            ))}

          </div>

        </div>

      </section>

{/* Pricing */}
<section
  id="pricing"
  className="border-y border-white/10 bg-slate-950/50 py-32"
>

  <div className="mx-auto max-w-7xl px-6">

    {/* Heading */}
    <div className="mb-16 text-center">

      <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
        Pricing
      </div>

      <h2 className="text-4xl font-bold md:text-5xl">

        Simple Pricing For
        <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          {' '}Smarter Launches
        </span>

      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-slate-400">

        Start free and experience
        AI-powered product launch
        intelligence before scaling.

      </p>

    </div>

    {/* Pricing Cards */}
    <div className="grid gap-8 lg:grid-cols-2">
            {/* Starter Free */}
            <Card className="relative overflow-hidden rounded-[36px] border border-cyan-500/20 bg-slate-900/60 p-10 backdrop-blur-xl">

{/* Glow */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_35%)]" />

<div className="relative">

  <div className="mb-6 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
    Starter Free
  </div>

  <h3 className="text-5xl font-bold">
    ₹0
  </h3>

  <p className="mt-2 text-slate-400">
    Forever free for students,
    startups, analysts,
    and product teams.
  </p>

  <div className="mt-8 space-y-4">

    {[
      'Unlimited Product Simulations',
      'AI SWOT Analysis',
      'Competitor Intelligence',
      'Dynamic Insights Dashboard',
      'AI PDF Reports',
      'Launch Risk Prediction',
    ].map((feature) => (

      <div
        key={feature}
        className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-300"
      >
        ✅ {feature}
      </div>

    ))}

  </div>

  <Button
    asChild
    size="lg"
    className="mt-10 w-full rounded-2xl"
  >

    <Link to="/app/new-simulation">
      Get Started Free
    </Link>

  </Button>

</div>

</Card>

{/* Premium */}
<Card className="relative overflow-hidden rounded-[36px] border border-violet-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-10 backdrop-blur-xl">

{/* Badge */}
<div className="absolute right-6 top-6 rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-300">
  Coming Soon
</div>

<div>

  <div className="mb-6 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
    Premium
  </div>

  <h3 className="text-5xl font-bold">
    ₹999
    <span className="text-lg text-slate-400">
      /month
    </span>
  </h3>

  <p className="mt-2 text-slate-400">
    Advanced intelligence for
    growing businesses and
    enterprise launch teams.
  </p>

  <div className="mt-8 space-y-4">

    {[
      'Everything In Starter',
      'Cloud Simulation Storage',
      'Team Workspace',
      'AI Strategic Recommendations',
      'Advanced Competitor Benchmarking',
      'Priority Support',
    ].map((feature) => (

      <div
        key={feature}
        className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-300"
      >
        🚀 {feature}
      </div>

    ))}

  </div>

  <Button
    disabled
    size="lg"
    className="mt-10 w-full rounded-2xl bg-violet-500 text-white hover:bg-violet-500"
  >
    Coming Soon
  </Button>

</div>

</Card>
</div>

{/* Bottom Note */}
<div className="mt-16 text-center">

  <p className="text-slate-500">

    No hidden charges.
    Start free and explore
    AI-powered launch intelligence.

  </p>

</div>

</div>

</section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <h2 className="text-4xl font-bold md:text-6xl">
            Ready To Build
            Smarter Product Launches?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">

            Predict launch success,
            understand your audience,
            benchmark competitors,
            and launch with confidence.

          </p>

          <div className="mt-10">

            <Button
  size="lg"
  onClick={() =>
    setShowSigninPopup(true)
  }
  className="rounded-2xl px-10 py-6 text-lg"
>

  Start Free Simulation

  <ArrowRight className="ml-2 size-5" />

</Button>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center md:flex-row">

          <div>

            <h3 className="text-lg font-semibold text-white">
              LaunchIQ.ai
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              AI-Powered Product Launch Intelligence
            </p>

          </div>

          <div className="flex gap-6 text-sm text-slate-400">

            <a
              href="#features"
              className="hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#intelligence"
              className="hover:text-white"
            >
              Intelligence
            </a>

          </div>

          <p className="text-sm text-slate-500">
            © 2026 LaunchIQ.ai
          </p>

        </div>

      </footer>

      {/* Sign In Popup */}
      {showSigninPopup && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 bg-[#0B1120] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">

            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_30%)]" />

            <div className="relative text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-cyan-500/20 to-violet-500/20">

                <Sparkles className="size-10 text-cyan-400" />

              </div>

              <h2 className="text-3xl font-bold">
                Authentication
                Coming Soon
              </h2>

              <p className="mt-5 leading-7 text-slate-400">

                Secure sign in,
                saved simulations,
                team collaboration,
                workspace access,
                and cloud sync
                are launching soon 🚀

              </p>

              <div className="mt-8 space-y-3">

                <Button
                  asChild
                  className="w-full rounded-2xl"
                >
                  <Link to="/app/new-simulation">
                    Continue Without Account
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full rounded-2xl border-white/10"
                  onClick={() =>
                    setShowSigninPopup(false)
                  }
                >
                  Close
                </Button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}
