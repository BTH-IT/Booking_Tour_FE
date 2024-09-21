import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bookingStatuses } from '@/constants/bookingStatus';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DashboardRoomInvoice() {
  return (
    <section className="container px-16 py-5">
      <Tabs defaultValue="all" className="w-full bg-white">
        <TabsList className="w-fit bg-white h-fit grid-cols-3 lg:grid-cols-9">
          {bookingStatuses.map((status) => (
            <TabsTrigger
              key={status}
              className="border-l-[1px] border-gray-300 px-6 font-normal text-center text-[17px] text-gray-400 cursor-pointer underline-offset-8 !shadow-none data-[state=active]:text-blue-500 data-[state=active]:underline"
              value={status.toLowerCase().replace(/\s+/g, '-')}
            >
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Table className="mt-10 border-2">
        <TableHeader className="border-solid border-b-[1px] border-gray-200">
          <TableRow>
            <TableHead className="text-2xl py-6 w-[10%]">Order ID</TableHead>
            <TableHead className="text-left text-2xl py-6 w-[40%]">
              Travel Date
            </TableHead>
            <TableHead className="text-center text-2xl py-6 w-[20%]">
              Total
            </TableHead>
            <TableHead className="text-center text-2xl py-6 w-[20%]">
              Payment Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{/* Add table rows data here */}</TableBody>
      </Table>
    </section>
  );
}
