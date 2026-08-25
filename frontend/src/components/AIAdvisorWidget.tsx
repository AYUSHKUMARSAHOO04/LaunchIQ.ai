import { useState } from 'react'

export default function AIAdvisorWidget() {
  const [open, setOpen] =
    useState(false)

  const [question, setQuestion] =
    useState('')

  const [answer, setAnswer] =
    useState('')

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

  const askAI = (
    customQuestion?: string
  ) => {
    const q = (
      customQuestion ||
      question
    ).toLowerCase()

    const audience =
      simulationData.audience?.toLowerCase() ||
      ''

    const price =
      Number(
        simulationData.price?.replace(
          /\D/g,
          ''
        )
      ) || 0

    let response =
      'I could not understand your question. Try asking about your product, simulation, pricing, risk, audience, or LaunchIQ.'

    // LaunchIQ Questions
    if (
      q.includes('launchiq') ||
      q.includes('platform') ||
      q.includes('what is this')
    ) {
      response =
        'LaunchIQ.ai is an AI-powered product launch intelligence platform that predicts launch success, consumer intent, risk, pricing opportunities, and strategic recommendations.'
    }

    // Risk
    else if (
      q.includes('risk')
    ) {
      response =
        simulationResults.riskScore >
        50
          ? 'Your launch risk appears higher due to weaker market readiness. Improve positioning, pricing, and early demand validation.'
          : 'Your launch risk is relatively low. The simulation indicates favorable launch conditions.'
    }

    // Launch Score
    else if (
      q.includes(
        'launch score'
      ) ||
      q.includes('score')
    ) {
      response =
        `Your launch score is ${simulationResults.launchScore}/100. Higher scores indicate stronger market readiness and launch confidence.`
    }

    // Pricing
    else if (
      q.includes('price') ||
      q.includes('pricing')
    ) {
      response =
        price > 100
          ? 'Your product appears premium-priced. Strong branding and premium positioning are essential.'
          : 'Affordable pricing improves early adoption and customer acquisition.'
    }

    // Audience
    else if (
      q.includes(
        'audience'
      ) ||
      q.includes(
        'customer'
      )
    ) {
      response =
        `Your primary audience appears to be ${simulationData.audience || 'general consumers'}.`
    }

    // Marketing
    else if (
      q.includes(
        'marketing'
      )
    ) {
      response =
        audience.includes(
          'gym'
        )
          ? 'Fitness influencers, Instagram reels, and gym partnerships may perform strongly.'
          : 'Social media campaigns, creator marketing, and digital ads can improve awareness.'
    }

    // Product
    else if (
      q.includes(
        'product'
      )
    ) {
      response =
        `Your current simulation product is ${simulationData.productName || 'your product'} and LaunchIQ suggests focusing on differentiation and audience fit.`
    }

    setAnswer(response)
  }

  return (
    <>
      {/* Floating Bot */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-3xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition duration-300 hover:scale-110"
      >
        🤖
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[330px] overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">

          {/* Header */}
          <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-5">

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-lg font-bold">
                    LaunchIQ AI
                  </h2>

                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Online
                  </div>

                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Ask anything about
                  your product,
                  simulation,
                  or LaunchIQ.ai
                </p>

              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-xl text-muted-foreground transition hover:text-white"
              >
                ✕
              </button>

            </div>
          </div>

          {/* Body */}
          <div className="space-y-4 p-5">

            <textarea
              value={question}
              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }
              placeholder="Ask anything about your product, simulation, pricing, audience, or LaunchIQ.ai..."
              className="min-h-[90px] w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm outline-none placeholder:text-muted-foreground"
            />

            <button
              onClick={() =>
                askAI()
              }
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Ask LaunchIQ AI
            </button>

            {/* AI Response */}
            {answer && (
              <div className="rounded-[24px] border-l-4 border-cyan-400 bg-cyan-500/5 p-4">

                <div className="mb-2 flex items-center gap-2">

                  <span className="text-lg">
                    🤖
                  </span>

                  <h3 className="font-semibold">
                    LaunchIQ AI
                  </h3>

                </div>

                <p className="text-sm leading-7 text-slate-300">
                  {answer}
                </p>

              </div>
            )}

            {/* Quick Questions */}
            <div>

              <p className="mb-3 text-sm font-medium text-slate-300">
                Quick Questions
              </p>

              <div className="flex flex-wrap gap-2">

                {[
                  'Why is my risk score high?',
                  'Pricing advice',
                  'Target audience',
                  'About LaunchIQ.ai',
                ].map(
                  (q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuestion(
                          q
                        )

                        setTimeout(() => {
                          askAI(q)
                        }, 100)
                      }}
                      className="rounded-full border border-white/10 bg-slate-900 px-3 py-2 text-xs transition hover:border-cyan-500 hover:bg-cyan-500/10"
                    >
                      {q}
                    </button>
                  )
                )}

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  )
}
