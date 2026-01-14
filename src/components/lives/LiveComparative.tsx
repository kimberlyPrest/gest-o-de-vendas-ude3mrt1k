import { Scale } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HostComparison } from './HostComparison'
import { LiveData } from '@/services/googleSheetsService'

interface LiveComparativeProps {
  data: LiveData[]
  allData: LiveData[]
  loading: boolean
  presenters?: string[]
}

export function LiveComparative({
  data,
  presenters = [],
}: LiveComparativeProps) {
  // Acceptance Criteria: The section must still only appear when 2 to 4 hosts are selected in the filters.
  if (presenters.length < 2 || presenters.length > 4) {
    return null
  }

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
        <HostComparison data={data} presenters={presenters} />
      </CardContent>
    </Card>
  )
}
