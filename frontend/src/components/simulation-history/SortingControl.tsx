import { ArrowUpDown } from 'lucide-react'
import { SortOption } from '@/utils/filterUtils'

interface SortingControlProps {
  onSortChange: (
    sort: SortOption
  ) => void
  currentSort?: SortOption
}

const SORT_OPTIONS: {
  value: SortOption
  label: string
}[] = [
  {
    value: 'newest',
    label: 'Newest First',
  },
  {
    value: 'oldest',
    label: 'Oldest First',
  },
  {
    value: 'highest-score',
    label:
      'Highest Launch Score',
  },
  {
    value: 'lowest-score',
    label:
      'Lowest Launch Score',
  },
  {
    value: 'highest-risk',
    label: 'Highest Risk',
  },
  {
    value: 'lowest-risk',
    label: 'Lowest Risk',
  },
  {
    value: 'a-z',
    label: 'A → Z',
  },
  {
    value: 'z-a',
    label: 'Z → A',
  },
  {
    value: 'highest-price',
    label: 'Highest Price',
  },
  {
    value: 'lowest-price',
    label: 'Lowest Price',
  },
]

export default function SortingControl({
  onSortChange,
  currentSort = 'newest',
}: SortingControlProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">

      <div className="flex items-center gap-2">
        <ArrowUpDown
          size={16}
          className="text-cyan-400"
        />

        <label
          htmlFor="sort-select"
          className="text-sm font-medium text-slate-300"
        >
          Sort By
        </label>
      </div>

      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) =>
          onSortChange(
            e.target.value as SortOption
          )
        }
        className="
          min-w-[220px]
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-sm
          text-white
          outline-none
          transition-all
          duration-200
          hover:border-slate-500
          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/20
        "
      >
        {SORT_OPTIONS.map(
          (option) => (
            <option
              key={option.value}
              value={option.value}
              className="
                bg-slate-900
                text-white
              "
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  )
}

