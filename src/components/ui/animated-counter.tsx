import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  formatter?: (val: number) => string
}

export function AnimatedCounter({
  value,
  duration = 800,
  prefix = '',
  suffix = '',
  className = '',
  formatter,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const startValue = displayValue
    const endValue = value

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4)

      const currentValue = startValue + (endValue - startValue) * easeProgress

      setDisplayValue(currentValue)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  const formattedValue = formatter
    ? formatter(displayValue)
    : displayValue.toFixed(Number.isInteger(value) ? 0 : 1)

  return (
    <span className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}
