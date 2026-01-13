import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { PresenterTable } from './PresenterTable'
import { WeekdayChart } from './WeekdayChart'
import { PeriodComparison } from './PeriodComparison'
import { LiveData } from '@/services/googleSheetsService'

interface LiveComparativeProps {
  data: LiveData[]
  allData: LiveData[] // Need allData for independent period comparison
  loading: boolean
}

export function LiveComparative({
  data,
  allData,
  loading,
}: LiveComparativeProps) {
  return (
    <Card className="overflow-hidden rounded-xl border shadow-sm">
      <CardContent className="p-0">
        <Tabs defaultValue="presenter" className="w-full">
          <div className="border-b bg-white px-4">
            <TabsList className="h-12 w-full justify-start gap-6 bg-transparent p-0">
              <TabsTrigger
                value="presenter"
                className="h-full rounded-none border-b-2 border-transparent bg-transparent px-4 pb-2 pt-2 font-medium text-muted-foreground data-[state=active]:border-[#3B82F6] data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
              >
                Por Apresentador
              </TabsTrigger>
              <TabsTrigger
                value="weekday"
                className="h-full rounded-none border-b-2 border-transparent bg-transparent px-4 pb-2 pt-2 font-medium text-muted-foreground data-[state=active]:border-[#3B82F6] data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
              >
                Por Dia da Semana
              </TabsTrigger>
              <TabsTrigger
                value="period"
                className="h-full rounded-none border-b-2 border-transparent bg-transparent px-4 pb-2 pt-2 font-medium text-muted-foreground data-[state=active]:border-[#3B82F6] data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
              >
                Por Período
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="presenter" className="m-0 bg-white p-4">
            <PresenterTable data={data} loading={loading} />
          </TabsContent>

          <TabsContent value="weekday" className="m-0 bg-white p-4">
            <WeekdayChart data={data} loading={loading} />
          </TabsContent>

          <TabsContent value="period" className="m-0 bg-white p-4">
            <PeriodComparison allData={allData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
