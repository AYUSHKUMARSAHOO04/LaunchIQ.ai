import {
    Navigate,
  } from 'react-router-dom'
  
  import {
    useAuth,
  } from '@/context/AuthContext'
  
  export function
  PublicRoute({
    children,
  }: {
    children:
      React.ReactNode
  }) {
  
    const {
      user,
      loading,
    } = useAuth()
  
    // Loading state
    if (loading) {
  
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#020817] text-white">
  
          <div className="text-center">
  
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
  
            <p className="text-slate-400">
              Loading LaunchIQ...
            </p>
  
          </div>
  
        </div>
      )
    }
  
    // Already logged in
    if (user) {
  
      return (
        <Navigate
          to="/app/dashboard"
          replace
        />
      )
    }
  
    return children
  }
