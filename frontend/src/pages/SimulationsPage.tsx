import { Link } from 'react-router-dom'

import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Plus } from 'lucide-react'

export function SimulationsPage() {
  return (
    <div className="space-y-6">

      <PageHeader
        title="Simulations"
        description="Create and manage AI-powered consumer reaction simulations for upcoming launches."
        actions={
          <Button asChild>
            <Link to="/app/new-simulation">
              <Plus className="size-4" />
              New simulation
            </Link>
          </Button>
        }
      />

      <Card className="border-dashed border-border/80">
        <CardHeader>
          <CardTitle>No simulations yet</CardTitle>

          <CardDescription>
            Start by defining your product, audience, and pricing.
            LaunchIQ will generate synthetic personas and launch insights.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link to="/app/new-simulation">
              <Plus className="size-4" />
              Create your first simulation
            </Link>
          </Button>
        </CardContent>
      </Card>

    </div>
  )
}
