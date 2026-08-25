import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useSimulationPagination } from '@/hooks/useSimulationPagination'

import SearchBar from '@/components/simulation-history/SearchBar'
import SortingControl from '@/components/simulation-history/SortingControl'
import SimulationFilters from '@/components/simulation-history/SimulationFilters'
import SimulationCard from '@/components/simulation-history/SimulationCard'

import {
  applyAllFilters,
  sortSimulations,
  getArchivedIds,
  SortOption,
} from '@/utils/filterUtils'

interface Simulation {
  id: string
  product_name: string
  audience: string
  category?: string
  description?: string
  market_segment?: string
  competitor?: string
  launch_goal?: string
  price: string | number
  launch_score: number
  risk_score: number
  market_sentiment: string
  created_at: string
}

interface FilterState {
  dateFilter: string
  riskFilter: string
  sentiment: string
  scoreFilter: string
  audience: string
  category: string
  priceFilter: string
  favoritesOnly: boolean
}

export default function SimulationHistory() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [allSimulations, setAllSimulations] = useState<Simulation[]>([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')

  const [filters, setFilters] = useState<FilterState>({
    dateFilter: 'all-time',
    riskFilter: 'all-risk',
    sentiment: 'all-sentiment',
    scoreFilter: 'all-score',
    audience: 'all-audience',
    category: 'all-category',
    priceFilter: 'all-price',
    favoritesOnly: false,
  })

  const [sortOption, setSortOption] =
    useState<SortOption>('newest')

  const fetchHistory = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('simulations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false,
        })

      if (error) throw error

      const archivedIds =
        getArchivedIds()

      const transformedData =
        (data || [])
          .filter(
            (sim) =>
              !archivedIds.includes(
                sim.id
              )
          )
          .map((sim) => ({
            ...sim,

            risk_percentage:
              Number(
                sim.risk_score
              ) || 0,

            sentiment:
              sim.market_sentiment
                ?.toLowerCase()
                ?.trim() || 'neutral',

            audience:
              sim.audience?.trim() ||
              '',

            category:
              sim.category?.trim() ||
              '',

            product_name:
              sim.product_name?.trim() ||
              '',

            price:
              Number(sim.price) || 0,
          })) || []

      setAllSimulations(
        transformedData
      )
    } catch (error) {
      console.error(
        'History fetch failed:',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [user])

  const filteredSimulations =
    useMemo(() => {
      const filtered =
        applyAllFilters(
          allSimulations,
          {
            ...filters,
            searchTerm,
          }
        )

      return sortSimulations(
        filtered,
        sortOption
      )
    }, [
      allSimulations,
      filters,
      searchTerm,
      sortOption,
    ])

  const pagination =
    useSimulationPagination({
      totalCount:
        filteredSimulations.length,
    })

  useEffect(() => {
    pagination.goToPage(1)
  }, [
    searchTerm,
    filters,
    sortOption,
  ])

  const paginatedSimulations =
    useMemo(() => {
      return filteredSimulations.slice(
        pagination.startIndex,
        pagination.endIndex + 1
      )
    }, [
      filteredSimulations,
      pagination.startIndex,
      pagination.endIndex,
    ])

  const deleteSimulation =
    async (id: string) => {
      try {
        const { error } =
          await supabase
            .from('simulations')
            .delete()
            .eq('id', id)

        if (error) throw error

        setAllSimulations(
          (prev) =>
            prev.filter(
              (sim) =>
                sim.id !== id
            )
        )
      } catch (error) {
        console.error(
          'Delete failed:',
          error
        )

        alert(
          'Failed to delete simulation.'
        )
      }
    }

  const openSimulation = (
    id: string
  ) => {
    navigate(
      `/app/simulation-results/${id}`
    )
  }

  const handleCompare = () => {
    navigate('/app/compare')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Simulations History
        </h1>

        <p className="mt-1 text-gray-400">
          Track, analyze, and
          manage all your product
          launch simulations with
          intelligent insights.
        </p>
      </div>

      <div className="space-y-4 mb-6 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-sm p-5 shadow-lg">

        <SearchBar
  onSearchChange={(query) => {
    setSearchTerm(query)

    pagination.goToPage(1)
  }}
/>

<SimulationFilters
  simulations={allSimulations}
  onFiltersChange={(newFilters) => {
    setFilters({
      dateFilter:
        newFilters.dateRange ||
        'all-time',

      riskFilter:
        newFilters.riskRange ||
        'all-risk',

      sentiment:
        newFilters.sentiment ||
        'all-sentiment',

      scoreFilter:
        newFilters.scoreRange ||
        'all-score',

      audience:
        newFilters.audience ||
        'all-audience',

      category:
        newFilters.category ||
        'all-category',

      priceFilter:
        newFilters.priceRange ||
        'all-price',

      favoritesOnly:
        newFilters.favorites,
    })
  }}
/>

        <div className="flex justify-between items-center">
          <SortingControl
            currentSort={
              sortOption
            }
            onSortChange={
              setSortOption
            }
          />
        </div>
      </div>

      {loading ? (
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="flex justify-center py-12">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-500 mx-auto mb-4" />

              <p className="text-gray-400">
                Loading simulations...
              </p>
            </div>
          </CardContent>
        </Card>
      ) : filteredSimulations.length >
        0 ? (
        <>
          <div className="space-y-4">
            {paginatedSimulations.map(
              (
                simulation
              ) => (
                <SimulationCard
                  key={`${simulation.id}-${searchTerm}`}
                  simulation={
                    simulation
                  }
                  onDelete={
                    deleteSimulation
                  }
                  onViewResults={
                    openSimulation
                  }
                  onCompare={
                    handleCompare
                  }
                />
              )
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-gray-400">
              Showing{' '}
              <span className="font-semibold text-white">
                {
                  pagination.startDisplay
                }
                –
                {
                  pagination.endDisplay
                }
              </span>{' '}
              of{' '}
              <span className="font-semibold text-white">
                {
                  filteredSimulations.length
                }
              </span>{' '}
              simulations
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={
                  pagination.goPrev
                }
                disabled={
                  !pagination.canPrev
                }
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm disabled:opacity-50"
              >
                ← Previous
              </button>

              <span className="text-sm text-gray-400">
                Page{' '}
                <span className="text-white font-semibold">
                  {
                    pagination.currentPage
                  }
                </span>{' '}
                of{' '}
                <span className="text-white font-semibold">
                  {
                    pagination.totalPages
                  }
                </span>
              </span>

              <button
                onClick={
                  pagination.goNext
                }
                disabled={
                  !pagination.canNext
                }
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        </>
      ) : (
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="flex justify-center py-12">
            <div className="text-center">
              <p className="text-lg font-semibold text-white">
                No simulations
                found
              </p>

              <p className="mt-1 text-gray-400">
                Try adjusting your
                filters or create a
                new simulation.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
