export type SimulationStatus = 'draft' | 'running' | 'completed' | 'failed'

export type LaunchRiskLevel = 'Low' | 'Medium' | 'High'

export type SimulationSummary = {
  id: string
  name: string
  category: string
  risk: LaunchRiskLevel
  status: SimulationStatus
  updatedAt: string
}
