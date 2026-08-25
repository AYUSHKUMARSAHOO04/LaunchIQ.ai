import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  FlaskConical,
  Target,
  TrendingUp,
  Search,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useSimulationPagination } from '@/hooks/useSimulationPagination'

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

export function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [simulations, setSimulations] =
    useState<Simulation[]>([])

  const [dashboardSearch, setDashboardSearch] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  const pagination =
    useSimulationPagination({
      totalCount: simulations.length,
    })

  const fetchSimulations = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const { data, error } =
        await supabase
          .from('simulations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', {
            ascending: false,
          })

      if (error) throw error

      setSimulations(data || [])
    } catch (error) {
      console.error(
        '[Dashboard] fetch failed:',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSimulations()
  }, [user])

  const deleteSimulation = async (
    id: string
  ) => {
    try {
      const { error } = await supabase
        .from('simulations')
        .delete()
        .eq('id', id)

      if (error) throw error

      setSimulations((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      )
    } catch (error) {
      console.error(
        '[Dashboard] Delete failed:',
        error
      )

      alert(
        'Failed to delete simulation.'
      )
    }
  }

  const getRiskColor = (
    score: number
  ) => {
    if (score >= 70)
      return 'text-red-500'

    if (score >= 40)
      return 'text-yellow-400'

    return 'text-green-500'
  }

  // GLOBAL SEARCH ACROSS ALL SIMULATIONS
  const filteredSimulations =
    useMemo(() => {
      return simulations.filter(
        (sim) =>
          sim.product_name
            ?.toLowerCase()
            .includes(
              dashboardSearch.toLowerCase()
            )
      )
    }, [
      simulations,
      dashboardSearch,
    ])

  // PAGINATION AFTER SEARCH
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your launch simulations, risk signals, and recent consumer intelligence."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active simulations"
          value={simulations.length.toString()}
          change="+0"
          icon={FlaskConical}
          trend="up"
        />

        <StatCard
          title="Avg. purchase likelihood"
          value="68%"
          change="+4.2% vs last month"
          icon={TrendingUp}
          trend="up"
        />

        <StatCard
          title="Launch risk score"
          value="42"
          change="Lower is better"
          icon={Target}
          trend="neutral"
        />

        <StatCard
          title="Personas generated"
          value="240"
          change="Across all runs"
          icon={Activity}
          trend="neutral"
        />
      </div>

      {/* Simulation History */}
      <Card className="border-border/70">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>
                Simulation History
              </CardTitle>

              <CardDescription>
                Track and manage your
                recent simulations.
              </CardDescription>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search simulation"
                value={dashboardSearch}
                onChange={(e) => {
                  setDashboardSearch(
                    e.target.value
                  )

                  // Reset to page 1 while searching
                  pagination.goToPage(1)
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

                <p className="text-muted-foreground">
                  Loading simulations...
                </p>
              </div>
            </div>
          ) : filteredSimulations.length >
            0 ? (
            <>
              <div className="divide-y divide-border rounded-lg border border-border/70">
                {paginatedSimulations.map(
                  (sim) => (
                    <div
                      key={sim.id}
                      className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {
                            sim.product_name
                          }
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {
                            sim.audience
                          }{' '}
                          • $
                          {sim.price}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            sim.created_at
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p
                            className={`text-sm font-bold ${getRiskColor(
                              sim.risk_score
                            )}`}
                          >
                            Risk:{' '}
                            {
                              sim.risk_score
                            }
                            %
                          </p>

                          <p className="text-xs text-green-500">
                            Score:{' '}
                            {
                              sim.launch_score
                            }
                            /100
                          </p>
                        </div>

                        <Badge variant="secondary">
                          {
                            sim.market_sentiment
                          }
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/app/simulation-results/${sim.id}`
                            )
                          }
                        >
                          View
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(
                              '/app/compare'
                            )
                          }
                        >
                          Compare
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            deleteSimulation(
                              sim.id
                            )
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{' '}
                  {pagination.startDisplay}–
                  {Math.min(
                    pagination.endDisplay,
                    filteredSimulations.length
                  )}{' '}
                  of{' '}
                  {
                    filteredSimulations.length
                  }{' '}
                  simulations
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      pagination.goPrev
                    }
                    disabled={
                      !pagination.canPrev
                    }
                  >
                    ← Previous
                  </Button>

                  <span className="flex items-center text-sm text-muted-foreground">
                    Page{' '}
                    {
                      pagination.currentPage
                    }{' '}
                    of{' '}
                    {
                      pagination.totalPages
                    }
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      pagination.goNext
                    }
                    disabled={
                      !pagination.canNext
                    }
                  >
                    Next →
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-48 items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">
                  No simulations found
                </h2>

                <p className="mt-2 text-muted-foreground">
                  Try another
                  simulation name.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
