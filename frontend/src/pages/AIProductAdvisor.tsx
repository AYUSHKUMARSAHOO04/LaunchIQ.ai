import {
  useState,
} from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

export default function AIProductAdvisor() {

  const [
    question,
    setQuestion,
  ] = useState('')

  const [
    answer,
    setAnswer,
  ] = useState('')

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

  const askAdvisor = () => {

    const q =
      question.toLowerCase()

    const audience =
      simulationData.audience?.toLowerCase() ||
      ''

    const category =
      simulationData.category?.toLowerCase() ||
      ''

    const price =
      Number(
        simulationData.price?.replace(
          /\D/g,
          ''
        )
      ) || 0

    let response: string

    // Launch Score Questions
    if (
      q.includes('launch score') ||
      q.includes('why score') ||
      q.includes('low score')
    ) {

      if (
        simulationResults.launchScore <
        70
      ) {

        response =
          'Your launch score is lower because market readiness appears weaker. Consider improving differentiation, clearer positioning, and stronger launch marketing.'
      } else {

        response =
          'Your launch score is strong. The product demonstrates good market fit and launch readiness.'
      }
    }

    // Risk Questions
    else if (
      q.includes('risk')
    ) {

      if (
        simulationResults.riskScore >
        50
      ) {

        response =
          'Risk is elevated due to weaker launch conditions. Improve positioning, pricing, and early market validation to reduce uncertainty.'
      } else {

        response =
          'Risk is relatively low. The product appears commercially promising with manageable launch uncertainty.'
      }
    }

    // Pricing Questions
    else if (
      q.includes('price') ||
      q.includes('pricing')
    ) {

      if (
        price > 100
      ) {

        response =
          'Your product uses premium pricing. Strong branding and premium positioning are essential to justify higher prices.'
      } else {

        response =
          'Affordable pricing increases adoption potential. Focus on customer acquisition and retention.'
      }
    }

    // Audience Questions
    else if (
      q.includes('audience') ||
      q.includes('customer')
    ) {

      response =
        `Your strongest audience appears to be ${simulationData.audience}. Focus marketing around their needs and behaviors.`
    }

    // Marketing Questions
    else if (
      q.includes('marketing')
    ) {

      if (
        audience.includes('gym')
      ) {

        response =
          'Fitness influencers, gym partnerships, and Instagram reels would likely perform best.'

      } else {

        response =
          'Use social media campaigns, targeted ads, and launch promotions to accelerate adoption.'
      }
    }

    // Default
    else {

      response =
        `Based on your ${simulationData.productName} simulation, focus on product positioning, audience targeting, and competitive differentiation for stronger launch success.`
    }

    setAnswer(
      response
    )
  }

  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-4xl font-bold">
          AI Product Advisor
        </h1>

        <p className="text-muted-foreground">
          Ask LaunchIQ AI for product strategy advice.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Ask a Question
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

        <textarea
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            placeholder="Ask something like: Why is my launch score low?"
            className="min-h-[120px] w-full rounded-xl border border-border bg-background p-4 outline-none"
          />

          <Button
            size="lg"
            onClick={askAdvisor}
            disabled={
              !question.trim()
            }
          >
            Ask LaunchIQ AI
          </Button>

        </CardContent>
      </Card>

      {/* AI Response */}
      {answer && (
        <Card>
          <CardHeader>
            <CardTitle>
              AI Recommendation
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="rounded-2xl border bg-muted/40 p-5">

              <h3 className="mb-2 font-semibold">
                LaunchIQ Strategic Advice
              </h3>

              <p className="leading-7 text-muted-foreground">
                {answer}
              </p>

            </div>

          </CardContent>
        </Card>
      )}

      {/* Suggested Questions */}
      <Card>
        <CardHeader>
          <CardTitle>
            Suggested Questions
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-3">

          {[
            'Why is my risk score high?',
            'How can I improve launch success?',
            'What pricing strategy should I use?',
            'Who is my target audience?',
            'What marketing should I do?',
          ].map(
            (q) => (
              <button
                key={q}
                onClick={() =>
                  setQuestion(q)
                }
                className="rounded-xl border px-4 py-2 text-sm transition hover:bg-muted"
              >
                {q}
              </button>
            )
          )}

        </CardContent>
      </Card>

    </div>
  )
}
