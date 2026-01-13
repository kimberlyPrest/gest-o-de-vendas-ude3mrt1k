import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, TrendingUp, CalendarCheck } from 'lucide-react'
import { useLivesStore } from '@/stores/livesStore'
import { useMemo } from 'react'

export function InsightsCard() {
  const { allData } = useLivesStore()

  const insights = useMemo(() => {
    if (!allData.length) return []

    const list = []

    // Best Day
    const days = allData.reduce(
      (acc, curr) => {
        acc[curr.weekday] = (acc[curr.weekday] || 0) + curr.sales
        return acc
      },
      {} as Record<string, number>,
    )
    const bestDay = Object.entries(days).sort((a, b) => b[1] - a[1])[0]
    if (bestDay) {
      list.push({
        icon: CalendarCheck,
        text: `${bestDay[0]} é o seu melhor dia de vendas.`,
        color: 'text-blue-500',
      })
    }

    // Trend
    const recent = allData.slice(-5)
    const avgRecent = recent.reduce((a, b) => a + b.sales, 0) / recent.length
    const globalAvg = allData.reduce((a, b) => a + b.sales, 0) / allData.length

    if (avgRecent > globalAvg * 1.1) {
      list.push({
        icon: TrendingUp,
        text: 'Suas vendas recentes estão 10% acima da média.',
        color: 'text-green-500',
      })
    }

    return list.slice(0, 3)
  }, [allData])

  if (!insights.length) return null

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-background border-indigo-100 dark:border-indigo-900 mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
          <Lightbulb className="h-4 w-4 text-indigo-500" />
          Insights Inteligentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <insight.icon className={`h-5 w-5 ${insight.color} mt-0.5`} />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {insight.text}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
