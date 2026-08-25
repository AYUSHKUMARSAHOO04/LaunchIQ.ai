import { useCallback, useEffect, useState } from 'react'
import { Archive, Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { calculateStatus } from '@/simulation/statusCalculator'

import {
  getStarredIds,
  getArchivedIds,
  toggleStar,
  toggleArchive,
} from '@/utils/filterUtils'

interface Simulation {
  id: string
  product_name: string
  audience: string
  price: string | number
  launch_score: number
  risk_score: number
  market_sentiment: string
  created_at: string
}

interface SimulationCardProps {
  simulation: Simulation
  onDelete: (id: string) => void
  onViewResults: (id: string) => void
  onCompare: () => void
}

export default function SimulationCard({
  simulation,
  onDelete,
  onViewResults,
  onCompare,
}: SimulationCardProps) {
  const [isStarred, setIsStarred] =
    useState(false)

  const [isArchived, setIsArchived] =
    useState(false)

  // Initial state
  useEffect(() => {
    const starredIds =
      getStarredIds()

    const archivedIds =
      getArchivedIds()

    setIsStarred(
      starredIds.includes(
        simulation.id
      )
    )

    setIsArchived(
      archivedIds.includes(
        simulation.id
      )
    )
  }, [simulation.id])

  const handleToggleStar =
    useCallback(() => {
      toggleStar(
        simulation.id
      )

      setIsStarred(
        (prev) => !prev
      )
    }, [simulation.id])

  const handleToggleArchive =
    useCallback(() => {
      toggleArchive(
        simulation.id
      )

      setIsArchived(
        (prev) => !prev
      )
    }, [simulation.id])

  const handleDelete =
    useCallback(() => {
      const confirmed =
        confirm(
          `Are you sure you want to delete "${simulation.product_name}"?`
        )

      if (confirmed) {
        onDelete(
          simulation.id
        )
      }
    }, [
      simulation.id,
      simulation.product_name,
      onDelete,
    ])

  // Risk color
  const getRiskColor = (
    risk: number = 0
  ) => {
    if (risk <= 20)
      return 'text-green-400'

    if (risk <= 40)
      return 'text-lime-400'

    if (risk <= 60)
      return 'text-yellow-400'

    if (risk <= 80)
      return 'text-orange-400'

    return 'text-red-400'
  }

  // Sentiment color
  const getSentimentColor = (
    sentiment?: string
  ) => {
    switch (
      sentiment?.toLowerCase()
    ) {
      case 'positive':
        return 'bg-green-500/10 text-green-400 border border-green-500/20'

      case 'neutral':
        return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'

      case 'negative':
        return 'bg-red-500/10 text-red-400 border border-red-500/20'

      default:
        return 'bg-slate-700 text-slate-300'
    }
  }

  const status =
    calculateStatus(
      simulation
    )

  const riskColor =
    getRiskColor(
      simulation.risk_score
    )

  const sentimentColor =
    getSentimentColor(
      simulation.market_sentiment
    )

  return (
    <Card
      className={`
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-950/60
        transition-all
        duration-300
        hover:border-cyan-500/30
        hover:shadow-lg
        hover:shadow-cyan-500/5
        ${
          isArchived
            ? 'opacity-60'
            : ''
        }
      `}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {
                simulation.product_name
              }
            </h3>

            <p className="text-sm text-slate-400">
              {new Date(
                simulation.created_at
              ).toLocaleDateString()}
              {' • '}
              {new Date(
                simulation.created_at
              ).toLocaleTimeString()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={
                handleToggleStar
              }
              className={`
                rounded-xl
                border
                p-2
                transition
                ${
                  isStarred
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-yellow-500'
                }
              `}
            >
              <Star
                size={18}
                fill={
                  isStarred
                    ? 'currentColor'
                    : 'none'
                }
              />
            </button>

            <button
              onClick={
                handleToggleArchive
              }
              className={`
                rounded-xl
                border
                p-2
                transition
                ${
                  isArchived
                    ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-cyan-500'
                }
              `}
            >
              <Archive size={18} />
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Audience
            </p>
            <p className="mt-1 text-sm text-white">
              {
                simulation.audience
              }
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Price
            </p>

            <p className="mt-1 text-sm text-white">
              $
              {typeof simulation.price ===
              'string'
                ? simulation.price
                : simulation.price.toFixed(
                    2
                  )}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Launch Score
            </p>

            <p className="mt-1 text-sm font-semibold text-cyan-400">
              {
                simulation.launch_score
              }
              <span className="text-slate-500">
                /100
              </span>
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Risk
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${riskColor}`}
            >
              {
                simulation.risk_score
              }
              %
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Sentiment
            </p>

            <span
              className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${sentimentColor}`}
            >
              {
                simulation.market_sentiment
              }
            </span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Status
            </p>

            <span
              className={`
                mt-1
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${status.color}
                ${status.bgColor}
              `}
            >
              {
                status.label
              }
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            size="sm"
            onClick={() =>
              onViewResults(
                simulation.id
              )
            }
            className="
              bg-cyan-500
              text-black
              hover:bg-cyan-400
            "
          >
            View Results
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onCompare}
            className="
              border-slate-700
              bg-slate-900
              text-white
              hover:border-cyan-500
              hover:bg-slate-800
            "
          >
            Compare
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="
              border-red-500/20
              bg-red-500/10
              text-red-400
              hover:bg-red-500/20
            "
            onClick={
              handleDelete
            }
          >
            <Trash2
              size={16}
              className="mr-1"
            />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
