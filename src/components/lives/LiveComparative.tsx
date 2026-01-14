import { Scale, Users, Calendar, Clock, BarChart2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PresenterTable } from './PresenterTable'
import { WeekdayChart } from './WeekdayChart'
import { PeriodComparison } from './PeriodComparison'
import { HostComparison } from './HostComparison'
import { LiveData } from '@/services/googleSheetsService'

interface LiveComparativeProps {
  data: LiveData[]
  allData: LiveData[]
  loading: boolean
  presenters?: string[] // Optional, passed from parent filter state
}

export function LiveComparative({
  data,
  allData,
  loading,
  presenters = [],
}: LiveComparativeProps) {
  return (
    <Card className="overflow-hidden rounded-xl border border-[#E5E5E7] shadow-sm bg-white">
      <CardHeader className="border-b border-[#E5E5E7] bg-white px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5F5F7] text-[#1D1D1F]">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-[#1D1D1F]">
              Comparativo de Hosts
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="comparative" className="w-full">
          <div className="border-b border-[#E5E5E7] bg-white px-6">
            <TabsList className="h-auto w-full justify-start gap-8 bg-transparent p-0">
              <TabsTrigger
                value="presenter"
                className="group relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-sm font-medium text-[#86868B] data-[state=active]:border-[#0071E3] data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-none hover:text-[#1D1D1F]"
              >
                Por Palestrante
              </TabsTrigger>
              <TabsTrigger
                value="comparative"
                className="group relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-sm font-medium text-[#86868B] data-[state=active]:border-[#0071E3] data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-none hover:text-[#1D1D1F]"
              >
                Análise Comparativa
              </TabsTrigger>
              <TabsTrigger
                value="weekday"
                className="group relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-sm font-medium text-[#86868B] data-[state=active]:border-[#0071E3] data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-none hover:text-[#1D1D1F]"
              >
                Por Dia
              </TabsTrigger>
              <TabsTrigger
                value="period"
                className="group relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-sm font-medium text-[#86868B] data-[state=active]:border-[#0071E3] data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-none hover:text-[#1D1D1F]"
              >
                Por Período
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="presenter"
            className="m-0 bg-white p-6 focus-visible:outline-none focus-visible:ring-0"
          >
            <PresenterTable data={data} loading={loading} />
          </TabsContent>

          <TabsContent
            value="comparative"
            className="m-0 bg-white focus-visible:outline-none focus-visible:ring-0"
          >
            <HostComparison data={data} presenters={presenters} />
          </TabsContent>

          <TabsContent
            value="weekday"
            className="m-0 bg-white p-6 focus-visible:outline-none focus-visible:ring-0"
          >
            <WeekdayChart data={data} loading={loading} />
          </TabsContent>

          <TabsContent
            value="period"
            className="m-0 bg-white p-6 focus-visible:outline-none focus-visible:ring-0"
          >
            <PeriodComparison allData={allData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
