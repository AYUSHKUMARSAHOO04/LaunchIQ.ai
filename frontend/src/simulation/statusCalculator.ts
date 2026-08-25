// Status calculator for determining simulation launch potential

export type SimulationStatus = 'high-potential' | 'moderate-potential' | 'risky' | 'needs-revision';

export interface Simulation {
  launch_score?: number;
  risk_percentage?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export function calculateStatus(simulation: Simulation): SimulationStatus {
  const launchScore = simulation.launch_score ?? 0;
  const risk = simulation.risk_percentage ?? 0;
  const sentiment = simulation.sentiment ?? 'neutral';

  // High Potential: launchScore > 70 AND risk < 40 AND sentiment === positive
  if (launchScore > 70 && risk < 40 && sentiment === 'positive') {
    return 'high-potential';
  }

  // Moderate Potential: launchScore between 50–70 AND risk between 40–60
  if (launchScore >= 50 && launchScore <= 70 && risk >= 40 && risk <= 60) {
    return 'moderate-potential';
  }

  // Needs Revision: launchScore < 40 OR (risk > 80 AND sentiment !== positive)
  if (launchScore < 40 || (risk > 80 && sentiment !== 'positive')) {
    return 'needs-revision';
  }

  // Risky Launch: launchScore < 50 OR risk > 70
  if (launchScore < 50 || risk > 70) {
    return 'risky';
  }

  // Default fallback
  return 'moderate-potential';
}

export function getStatusLabel(status: SimulationStatus): string {
  const labels: Record<SimulationStatus, string> = {
    'high-potential': 'High Potential',
    'moderate-potential': 'Moderate Potential',
    'risky': 'Risky Launch',
    'needs-revision': 'Needs Revision',
  };
  return labels[status];
}

export function getStatusColor(status: SimulationStatus): string {
  const colors: Record<SimulationStatus, string> = {
    'high-potential': 'bg-green-100 text-green-800',
    'moderate-potential': 'bg-yellow-100 text-yellow-800',
    'risky': 'bg-orange-100 text-orange-800',
    'needs-revision': 'bg-red-100 text-red-800',
  };
  return colors[status];
}
