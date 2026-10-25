import type React from "react"

interface SkeletonProps {
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({className = ""}) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/5 border border-white/5 ${className}`}
    >
    </div>
  )
}