import { useCallback, useMemo, useState } from 'react'
import { X, Star } from 'lucide-react'

interface FilterState {
  dateRange: string
  riskRange: string
  sentiment: string
  scoreRange: string
  audience: string
  category: string
  priceRange: string
  status: string
  favorites: boolean
}

interface SimulationFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  simulations?: Array<{ audience: string }>
}

const AUDIENCES = [
  'Gen Z',
  'Millennials',
  'Professionals',
  'Students',
  'Parents',
  'Startups',
  'Enterprises',
]

const CATEGORIES = [
  'FinTech',
  'HealthTech',
  'SaaS',
  'Education',
  'Consumer Product',
  'AI Product',
  'Productivity',
]

export default function SimulationFilters({
  onFiltersChange,
  simulations = [],
}: SimulationFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '',
    riskRange: '',
    sentiment: '',
    scoreRange: '',
    audience: '',
    category: '',
    priceRange: '',
    status: '',
    favorites: false,
  })

  const dynamicAudiences = useMemo(() => {
    const audiencesSet = new Set<string>()

    simulations.forEach((sim) => {
      if (sim.audience) {
        audiencesSet.add(sim.audience)
      }
    })

    const unique = Array.from(audiencesSet).sort()

    return unique.length > 0
      ? unique
      : AUDIENCES
  }, [simulations])

  const handleFilterChange = useCallback(
    (
      key: keyof FilterState,
      value: string | boolean
    ) => {
      const newFilters = {
        ...filters,
        [key]: value,
      }

      setFilters(newFilters)
      onFiltersChange(newFilters)
    },
    [filters, onFiltersChange]
  )

  const handleReset = useCallback(() => {
    const resetFilters: FilterState = {
      dateRange: '',
      riskRange: '',
      sentiment: '',
      scoreRange: '',
      audience: '',
      category: '',
      priceRange: '',
      status: '',
      favorites: false,
    }

    setFilters(resetFilters)
    onFiltersChange(resetFilters)
  }, [onFiltersChange])

  const activeFilterCount =
    useMemo(() => {
      return Object.values(filters).filter(
        (value) =>
          value !== '' &&
          value !== false
      ).length
    }, [filters])

  const selectClass =
    'w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 hover:border-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 backdrop-blur-sm shadow-lg space-y-5">

      {/* Filters Grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">

        {/* Date */}
        <select
          value={filters.dateRange}
          onChange={(e) =>
            handleFilterChange(
              'dateRange',
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Time
          </option>
          <option value="today">
            Today
          </option>
          <option value="last-7-days">
            Last 7 Days
          </option>
          <option value="last-30-days">
            Last 30 Days
          </option>
          <option value="this-month">
            This Month
          </option>
          <option value="last-month">
            Last Month
          </option>
        </select>

        {/* Risk */}
        <select
          value={filters.riskRange}
          onChange={(e) =>
            handleFilterChange(
              'riskRange',
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Risk Levels
          </option>
          <option value="very-low">
            Very Low (0–20)
          </option>
          <option value="low">
            Low (21–40)
          </option>
          <option value="medium">
            Medium (41–60)
          </option>
          <option value="high">
            High (61–80)
          </option>
          <option value="very-high">
            Very High (81–100)
          </option>
        </select>

        {/* Sentiment */}
        <select
          value={filters.sentiment}
          onChange={(e) =>
            handleFilterChange(
              'sentiment',
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Sentiments
          </option>
          <option value="positive">
            Positive
          </option>
          <option value="neutral">
            Neutral
          </option>
          <option value="negative">
            Negative
          </option>
        </select>

        {/* Score */}
        <select
          value={filters.scoreRange}
          onChange={(e) =>
            handleFilterChange(
              'scoreRange',
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Scores
          </option>
          <option value="strong">
            Strong (80–100)
          </option>
          <option value="moderate">
            Moderate (60–79)
          </option>
          <option value="weak">
            Weak (40–59)
          </option>
          <option value="concern">
            High Concern (&lt;40)
          </option>
        </select>

        {/* Audience */}
        <select
          value={filters.audience}
          onChange={(e) =>
            handleFilterChange(
              'audience',
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Audiences
          </option>

          {dynamicAudiences.map(
            (aud) => (
              <option
                key={aud}
                value={aud}
              >
                {aud}
              </option>
            )
          )}
        </select>
      </div>

      {/* Second Row */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) =>
            handleFilterChange(
              'category',
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Categories
          </option>

          {CATEGORIES.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        {/* Price */}
        <select
          value={filters.priceRange}
          onChange={(e) =>
            handleFilterChange(
              'priceRange',
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Prices
          </option>
          <option value="0-50">
            $0–50
          </option>
          <option value="50-100">
            $50–100
          </option>
          <option value="100-500">
            $100–500
          </option>
          <option value="500+">
            $500+
          </option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) =>
            handleFilterChange(
              'status',
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Status
          </option>
          <option value="high-potential">
            High Potential
          </option>
          <option value="moderate">
            Moderate Potential
          </option>
          <option value="risky">
            Risky Launch
          </option>
          <option value="needs-revision">
            Needs Revision
          </option>
        </select>

        {/* Favorites */}
        <button
          onClick={() =>
            handleFilterChange(
              'favorites',
              !filters.favorites
            )
          }
          className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
            filters.favorites
              ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
              : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
          }`}
        >
          <Star size={16} />
          Favorites
        </button>

      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">

        <p className="text-sm text-slate-400">
          {activeFilterCount > 0 ? (
            <>
              Active Filters:{' '}
              <span className="font-semibold text-cyan-400">
                {activeFilterCount}
              </span>
            </>
          ) : (
            'No active filters'
          )}
        </p>

        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white transition hover:border-red-500 hover:text-red-400"
          >
            <X size={16} />
            Reset All
          </button>
        )}
      </div>
    </div>
  )
}
