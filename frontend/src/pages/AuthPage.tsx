import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import { supabase } from '@/lib/supabase'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AuthPage() {

  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [isLogin, setIsLogin] =
    useState(true)

  const [errorMessage,
    setErrorMessage,
  ] = useState('')

  async function handleAuth() {

    try {

      setLoading(true)

      setErrorMessage('')

      if (isLogin) {

        const {
          error,
        } =
          await supabase.auth
            .signInWithPassword({
              email,
              password,
            })

        if (error)
          throw error

        navigate(
          '/app/dashboard'
        )
      }

      else {

        const {
          error,
        } =
          await supabase.auth
            .signUp({
              email,
              password,
            })

        if (error)
          throw error

        navigate(
          '/app/dashboard'
        )
      }
    }

    catch (error) {

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    }

    finally {

      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020817] px-6 text-white">

      <Card className="w-full max-w-md border border-white/10 bg-slate-950 text-white shadow-2xl">

        <CardHeader>

          <CardTitle className="text-center text-3xl font-bold">

            {isLogin
              ? 'Welcome Back'
              : 'Create Account'}

          </CardTitle>

          <p className="text-center text-sm text-slate-400">

            {isLogin
              ? 'Login to LaunchIQ.ai'
              : 'Create your LaunchIQ account'}

          </p>

        </CardHeader>

        <CardContent className="space-y-5">

          {/* Email */}
          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Error */}
          {errorMessage && (

            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">

              {errorMessage}

            </div>

          )}

          {/* Submit */}
          <Button
            onClick={
              handleAuth
            }
            disabled={
              loading
            }
            className="w-full rounded-xl bg-cyan-500 text-black hover:bg-cyan-400"
          >

            {loading
              ? 'Please wait...'
              : isLogin
              ? 'Login'
              : 'Create Account'}

          </Button>

          {/* Toggle */}
          <p className="text-center text-sm text-slate-400">

            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}

            <button
              onClick={() =>
                setIsLogin(
                  !isLogin
                )
              }
              className="ml-2 font-medium text-cyan-400 hover:text-cyan-300"
            >

              {isLogin
                ? 'Sign up'
                : 'Login'}

            </button>

          </p>

          {/* Home */}
          <Link
            to="/"
            className="block text-center text-sm text-slate-500 hover:text-slate-300"
          >
            ← Back to Home
          </Link>

        </CardContent>

      </Card>

    </div>
  )
}
