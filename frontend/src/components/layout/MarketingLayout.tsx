import { Link, Outlet } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function MarketingLayout() {

  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020817]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[5rem] max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >

            <img
              src="/brand/logo-dark.png"
              alt="LaunchIQ"
              className="h-14 w-auto object-contain"
            />

          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">

            <a
              href="#features"
              className="transition hover:text-cyan-400"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-cyan-400"
            >
              How It Works
            </a>

            <a
              href="#intelligence"
              className="transition hover:text-cyan-400"
            >
              Intelligence
            </a>

            <a
              href="#pricing"
              className="transition hover:text-cyan-400"
            >
              Pricing
            </a>

          </nav>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">

            {/* Sign In */}
            <Button
              variant="ghost"
              asChild
              className="text-white hover:bg-white/10"
            >

              <Link to="/app/auth">
                Sign In
              </Link>

            </Button>

            {/* Get Started */}
            <Button
              asChild
              className="rounded-xl bg-cyan-500 px-6 text-black hover:bg-cyan-400"
            >

              <Link to="/app/dashboard">
                Get Started
              </Link>

            </Button>

          </div>

        </div>

      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

    </div>
  )
}
