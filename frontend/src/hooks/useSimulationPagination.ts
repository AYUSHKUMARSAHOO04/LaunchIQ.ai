import { useState } from 'react'

const PAGE_SIZE = 10

interface UseSimulationPaginationProps {
  totalCount: number
}

export function useSimulationPagination({ totalCount }: UseSimulationPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE - 1

  const startDisplay = totalCount === 0 ? 0 : startIndex + 1
  const endDisplay = Math.min(endIndex + 1, totalCount)

  const canNext = currentPage < totalPages
  const canPrev = currentPage > 1

  const goNext = () => {
    if (canNext) setCurrentPage(currentPage + 1)
  }

  const goPrev = () => {
    if (canPrev) setCurrentPage(currentPage - 1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const reset = () => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    startDisplay,
    endDisplay,
    canNext,
    canPrev,
    goNext,
    goPrev,
    goToPage,
    reset,
    PAGE_SIZE,
  }
}
