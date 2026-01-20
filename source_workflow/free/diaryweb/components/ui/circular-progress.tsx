'use client'

import { useEffect, useState } from 'react'

interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
}

export function CircularProgress({
  percentage,
  size = 200,
  strokeWidth = 20,
  label,
  sublabel,
}: CircularProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="circular-progress"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="circular-progress-bg"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="circular-progress-fill"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gray-800">
          {Math.round(animatedPercentage)}
          <span className="text-2xl">%</span>
        </span>
        {label && (
          <span className="text-sm text-gray-500 mt-1">{label}</span>
        )}
      </div>
    </div>
  )
}

