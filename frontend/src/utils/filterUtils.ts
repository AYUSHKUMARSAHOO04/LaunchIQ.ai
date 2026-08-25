// Filter and search utility functions for SimulationHistory

export interface Simulation {
  id: string;
  product_name?: string;
  audience?: string;
  category?: string;
  created_at?: string;
  risk_percentage?: number;
  launch_score?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
  price?: number;
  description?: string;
  market_segment?: string;
  competitor?: string;
  launch_goal?: string;
}

// ---------------- SEARCH ----------------

export function searchSimulations(
  simulations: Simulation[],
  searchTerm: string
): Simulation[] {
  if (!searchTerm.trim()) return simulations;

  const term = searchTerm.toLowerCase();

  return simulations.filter((sim) => {
    return (
      sim.product_name?.toLowerCase().includes(term) ||
      sim.audience?.toLowerCase().includes(term) ||
      sim.category?.toLowerCase().includes(term) ||
      sim.id?.toLowerCase().includes(term) ||
      sim.description?.toLowerCase().includes(term) ||
      sim.market_segment?.toLowerCase().includes(term) ||
      sim.competitor?.toLowerCase().includes(term) ||
      sim.launch_goal?.toLowerCase().includes(term)
    );
  });
}

// ---------------- DATE FILTER ----------------

export function applyDateFilter(
  simulations: Simulation[],
  dateFilter: string
): Simulation[] {
  if (!dateFilter || dateFilter === 'all-time') {
    return simulations;
  }

  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  return simulations.filter((sim) => {
    if (!sim.created_at) return false;

    const simDate = new Date(sim.created_at);

    switch (dateFilter) {
      case 'today':
        return simDate >= today;

      case 'last-7-days': {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return simDate >= date;
      }

      case 'last-30-days': {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return simDate >= date;
      }

      case 'this-month':
        return (
          simDate.getMonth() === now.getMonth() &&
          simDate.getFullYear() === now.getFullYear()
        );

      case 'last-month': {
        const firstDayLastMonth = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );

        const lastDayLastMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          0
        );

        return (
          simDate >= firstDayLastMonth &&
          simDate <= lastDayLastMonth
        );
      }

      default:
        return true;
    }
  });
}

// ---------------- RISK FILTER ----------------

export function applyRiskFilter(
  simulations: Simulation[],
  riskFilter: string
): Simulation[] {
  if (!riskFilter || riskFilter === 'all-risk') {
    return simulations;
  }

  return simulations.filter((sim) => {
    const risk = sim.risk_percentage ?? 0;

    switch (riskFilter) {
      case 'very-low':
        return risk >= 0 && risk <= 20;

      case 'low':
        return risk > 20 && risk <= 40;

      case 'medium':
        return risk > 40 && risk <= 60;

      case 'high':
        return risk > 60 && risk <= 80;

      case 'very-high':
        return risk > 80;

      default:
        return true;
    }
  });
}

// ---------------- SENTIMENT FILTER ----------------

export function applySentimentFilter(
  simulations: Simulation[],
  sentiment: string
): Simulation[] {
  if (!sentiment || sentiment === 'all-sentiment') {
    return simulations;
  }

  return simulations.filter(
    (sim) => sim.sentiment === sentiment
  );
}

// ---------------- SCORE FILTER ----------------

export function applyLaunchScoreFilter(
  simulations: Simulation[],
  scoreFilter: string
): Simulation[] {
  if (!scoreFilter || scoreFilter === 'all-score') {
    return simulations;
  }

  return simulations.filter((sim) => {
    const score = sim.launch_score ?? 0;

    switch (scoreFilter) {
      case 'strong':
        return score >= 80;

      case 'moderate':
        return score >= 60 && score < 80;

      case 'weak':
        return score >= 40 && score < 60;

      case 'high-concern':
        return score < 40;

      default:
        return true;
    }
  });
}

// ---------------- AUDIENCE FILTER ----------------

export function applyAudienceFilter(
  simulations: Simulation[],
  audience: string
): Simulation[] {
  if (!audience || audience === 'all-audience') {
    return simulations;
  }

  return simulations.filter(
    (sim) => sim.audience === audience
  );
}

// ---------------- CATEGORY FILTER ----------------

export function applyCategoryFilter(
  simulations: Simulation[],
  category: string
): Simulation[] {
  if (!category || category === 'all-category') {
    return simulations;
  }

  return simulations.filter(
    (sim) => sim.category === category
  );
}

// ---------------- PRICE FILTER ----------------

export function applyPriceFilter(
  simulations: Simulation[],
  priceFilter: string
): Simulation[] {
  if (!priceFilter || priceFilter === 'all-price') {
    return simulations;
  }

  return simulations.filter((sim) => {
    const price = Number(sim.price ?? 0);

    switch (priceFilter) {
      case '0-50':
        return price >= 0 && price <= 50;

      case '50-100':
        return price > 50 && price <= 100;

      case '100-500':
        return price > 100 && price <= 500;

      case '500+':
        return price > 500;

      default:
        return true;
    }
  });
}

// ---------------- FAVORITES ----------------
export function applyFavoritesFilter(
  simulations: Simulation[],
  favoritesOnly: boolean
): Simulation[] {
  if (!favoritesOnly) {
    return simulations
  }

  const starredIds =
    getStarredIds()

  return simulations.filter(
    (simulation) =>
      starredIds.includes(
        simulation.id
      )
  )
}

export function getStarredIds(): string[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const data = localStorage.getItem(
      'starred_simulations'
    )

    return data
      ? JSON.parse(data)
      : []
  } catch (error) {
    console.error(
      'Failed to read starred simulations:',
      error
    )

    return []
  }
}

export function toggleStar(
  simulationId: string
): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const starredIds =
      getStarredIds()

    const exists =
      starredIds.includes(
        simulationId
      )

    const updatedIds =
      exists
        ? starredIds.filter(
            (id) =>
              id !== simulationId
          )
        : [
            ...starredIds,
            simulationId,
          ]

    localStorage.setItem(
      'starred_simulations',
      JSON.stringify(
        updatedIds
      )
    )
  } catch (error) {
    console.error(
      'Failed to toggle star:',
      error
    )
  }
}

export function isStarred(
  simulationId: string
): boolean {
  return getStarredIds().includes(
    simulationId
  )
}

// ---------------- ARCHIVE ----------------
export function getArchivedIds(): string[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const data = localStorage.getItem(
      'archived_simulations'
    )

    return data
      ? JSON.parse(data)
      : []
  } catch (error) {
    console.error(
      'Failed to read archived simulations:',
      error
    )

    return []
  }
}

export function toggleArchive(
  simulationId: string
): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const archivedIds =
      getArchivedIds()

    const exists =
      archivedIds.includes(
        simulationId
      )

    const updatedIds =
      exists
        ? archivedIds.filter(
            (id) =>
              id !== simulationId
          )
        : [
            ...archivedIds,
            simulationId,
          ]

    localStorage.setItem(
      'archived_simulations',
      JSON.stringify(
        updatedIds
      )
    )
  } catch (error) {
    console.error(
      'Failed to toggle archive:',
      error
    )
  }
}

export function isArchived(
  simulationId: string
): boolean {
  return getArchivedIds().includes(
    simulationId
  )
}

// ---------------- SORT ----------------

export type SortOption =
  | 'newest'
  | 'oldest'
  | 'highest-risk'
  | 'lowest-risk'
  | 'highest-score'
  | 'lowest-score'
  | 'a-z'
  | 'z-a'
  | 'highest-price'
  | 'lowest-price';

export function sortSimulations(
  simulations: Simulation[],
  sortOption: SortOption
): Simulation[] {
  const sorted = [...simulations];

  switch (sortOption) {
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at ?? '').getTime() -
          new Date(a.created_at ?? '').getTime()
      );

    case 'oldest':
      return sorted.sort(
        (a, b) =>
          new Date(a.created_at ?? '').getTime() -
          new Date(b.created_at ?? '').getTime()
      );

    case 'highest-risk':
      return sorted.sort(
        (a, b) =>
          (b.risk_percentage ?? 0) -
          (a.risk_percentage ?? 0)
      );

    case 'lowest-risk':
      return sorted.sort(
        (a, b) =>
          (a.risk_percentage ?? 0) -
          (b.risk_percentage ?? 0)
      );

    case 'highest-score':
      return sorted.sort(
        (a, b) =>
          (b.launch_score ?? 0) -
          (a.launch_score ?? 0)
      );

    case 'lowest-score':
      return sorted.sort(
        (a, b) =>
          (a.launch_score ?? 0) -
          (b.launch_score ?? 0)
      );

    case 'a-z':
      return sorted.sort((a, b) =>
        (a.product_name ?? '').localeCompare(
          b.product_name ?? ''
        )
      );

    case 'z-a':
      return sorted.sort((a, b) =>
        (b.product_name ?? '').localeCompare(
          a.product_name ?? ''
        )
      );

    case 'highest-price':
      return sorted.sort(
        (a, b) =>
          Number(b.price ?? 0) -
          Number(a.price ?? 0)
      );

    case 'lowest-price':
      return sorted.sort(
        (a, b) =>
          Number(a.price ?? 0) -
          Number(b.price ?? 0)
      );

    default:
      return sorted;
  }
}

// ---------------- MAIN FILTER PIPELINE ----------------

export function applyAllFilters(
  simulations: Simulation[],
  filters: {
    searchTerm?: string;
    dateFilter?: string;
    riskFilter?: string;
    sentiment?: string;
    scoreFilter?: string;
    audience?: string;
    category?: string;
    priceFilter?: string;
    favoritesOnly?: boolean;
  }
): Simulation[] {
  let filtered = [...simulations];

  filtered = searchSimulations(
    filtered,
    filters.searchTerm ?? ''
  );

  filtered = applyDateFilter(
    filtered,
    filters.dateFilter ?? 'all-time'
  );

  filtered = applyRiskFilter(
    filtered,
    filters.riskFilter ?? 'all-risk'
  );

  filtered = applySentimentFilter(
    filtered,
    filters.sentiment ?? 'all-sentiment'
  );

  filtered = applyLaunchScoreFilter(
    filtered,
    filters.scoreFilter ?? 'all-score'
  );

  filtered = applyAudienceFilter(
    filtered,
    filters.audience ?? 'all-audience'
  );

  filtered = applyCategoryFilter(
    filtered,
    filters.category ?? 'all-category'
  );

  filtered = applyPriceFilter(
    filtered,
    filters.priceFilter ?? 'all-price'
  );

  filtered = applyFavoritesFilter(
    filtered,
    filters.favoritesOnly ?? false
  );

  return filtered;
}
