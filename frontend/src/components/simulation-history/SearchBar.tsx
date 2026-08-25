import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  Search,
  X,
} from 'lucide-react'

interface SearchBarProps {
  onSearchChange: (
    query: string
  ) => void

  placeholder?: string
}

export default function SearchBar({
  onSearchChange,
  placeholder = 'Search Simulation',
}: SearchBarProps) {
  const [query, setQuery] =
    useState('')

  // Debounced search
  useEffect(() => {
    const timer =
      setTimeout(() => {
        onSearchChange(
          query
        )
      }, 300)

    return () =>
      clearTimeout(
        timer
      )
  }, [
    query,
    onSearchChange,
  ])

  const handleSearch =
    useCallback(() => {
      onSearchChange(
        query
      )
    }, [
      query,
      onSearchChange,
    ])

  const handleClear =
    useCallback(() => {
      setQuery('')

      onSearchChange(
        ''
      )
    }, [onSearchChange])

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        placeholder={
          placeholder
        }
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        onKeyDown={(e) => {
          if (
            e.key ===
            'Enter'
          ) {
            handleSearch()
          }
        }}
        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          py-3
          pl-5
          pr-24
          text-sm
          text-white
          placeholder:text-slate-500
          transition-all
          duration-200
          focus:border-cyan-500
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-500/20
        "
      />

      {/* Right Icons */}
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {/* Clear Button */}
        {query && (
          <button
            onClick={
              handleClear
            }
            className="
              rounded-md
              p-1
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
            "
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={
            handleSearch
          }
          className="
            rounded-lg
            bg-cyan-500/10
            p-2
            text-cyan-400
            transition
            hover:bg-cyan-500/20
          "
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  )
}
