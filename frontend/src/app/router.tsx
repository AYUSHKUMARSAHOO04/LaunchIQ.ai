import {
  createBrowserRouter,
  Navigate,
} from 'react-router-dom'

import {
  DashboardLayout,
} from '@/components/layout/DashboardLayout'

import {
  MarketingLayout,
} from '@/components/layout/MarketingLayout'

import {
  ProtectedRoute,
} from '@/components/auth/ProtectedRoute'

import {
  PublicRoute,
} from '@/components/auth/PublicRoute'

import {
  DashboardPage,
} from '@/pages/DashboardPage'

import {
  LandingPage,
} from '@/pages/LandingPage'

import {
  NotFoundPage,
} from '@/pages/NotFoundPage'

import {
  SimulationsPage,
} from '@/pages/SimulationsPage'

import NewSimulation
  from '@/pages/NewSimulation'

import {
  InsightsPage,
} from '@/pages/InsightsPage'

import {
  SettingsPage,
} from '@/pages/SettingsPage'

import {
  SimulationResults,
} from '@/pages/SimulationResults'

import ChooseInsights
  from '@/pages/ChooseInsights'

import CompareProducts
  from '@/pages/CompareProducts'

import SimulationHistory
  from '@/pages/SimulationHistory'

import AIProductAdvisor
  from '@/pages/AIProductAdvisor'

import CompetitorIntelligence
  from '@/pages/CompetitorIntelligence'

import SWOTAnalysis
  from '@/pages/SWOTAnalysis'

import AuthPage
  from '@/pages/AuthPage'

export const router =
  createBrowserRouter([

    // -----------------------------
    // LANDING WEBSITE
    // -----------------------------
    {
      element:
        <MarketingLayout />,

      children: [
        {
          path: '/',

          element:
            <LandingPage />,
        },
      ],
    },

    // -----------------------------
    // AUTH PAGE (PUBLIC)
    // -----------------------------
    {
      path:
        '/app/auth',

      element: (

        <PublicRoute>

          <AuthPage />

        </PublicRoute>
      ),
    },

    // -----------------------------
    // PROTECTED DASHBOARD
    // -----------------------------
    {
      path: '/app',

      element: (

        <ProtectedRoute>

          <DashboardLayout />

        </ProtectedRoute>
      ),

      children: [

        // Default Redirect
        {
          index: true,

          element: (
            <Navigate
              to="/app/dashboard"
              replace
            />
          ),
        },

        // Dashboard
        {
          path:
            'dashboard',

          element:
            <DashboardPage />,
        },

        // Simulations
        {
          path:
            'simulations',

          element:
            <SimulationsPage />,
        },

        // New Simulation
        {
          path:
            'new-simulation',

          element:
            <NewSimulation />,
        },

        // Simulation Results
        {
          path:
            'simulation-results/:id',
        
          element:
            <SimulationResults />,
        },

        // Choose Insights
        {
          path:
            'choose-insights',

          element:
            <ChooseInsights />,
        },

        // Insights
        {
          path:
            'insights',

          element:
            <InsightsPage />,
        },

        // Compare
        {
          path:
            'compare',

          element:
            <CompareProducts />,
        },

        // History
        {
          path:
            'history',

          element:
            <SimulationHistory />,
        },

        // AI Advisor
        {
          path:
            'advisor',

          element:
            <AIProductAdvisor />,
        },

        // Competitor Intelligence
        {
          path:
            'competitor-intelligence',

          element:
            <CompetitorIntelligence />,
        },

        // SWOT Analysis
        {
          path:
            'swot-analysis',

          element:
            <SWOTAnalysis />,
        },

        // Settings
        {
          path:
            'settings',

          element:
            <SettingsPage />,
        },
      ],
    },

    // -----------------------------
    // 404 PAGE
    // -----------------------------
    {
      path: '*',

      element:
        <NotFoundPage />,
    },
  ])
