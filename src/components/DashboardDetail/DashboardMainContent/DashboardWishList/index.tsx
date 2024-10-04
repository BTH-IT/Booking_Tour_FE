import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Clock, Trash2 } from 'lucide-react';

export default function DashboardWishList() {
  return (
    <section className="container mx-auto p-4">
      <Table className="mt-10 border-2">
        <TableHeader className="border-solid border-b-[1px] border-gray-200">
          <TableRow>
            <TableHead className="text-2xl py-6 w-[85%]">Tour Name</TableHead>
            <TableHead className="text-2xl py-6 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-4">
                <img
                  src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2017/01/samuel-ferrara-npwjNTG_SQA-unsplash-150x150.jpg"
                  alt="Victoria Falls"
                  className="rounded-md w-28 h-28 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-xl text-blue-500">
                    5-Day Johannesburg - Victoria Falls
                  </h3>
                  <div className="flex items-center text-lg text-muted-foreground mt-1">
                    <Clock className="mr-1 h-4 w-4" />5 Days 4 Nights
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="ghost"
                className="text-xl py-6 text-red-500 hover:text-red-700 hover:bg-red-100"
              >
                <Trash2 className="w-6 h-6 mr-2 mb-[2px]" />
                Remove
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-4">
                <img
                  src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2017/01/samuel-ferrara-npwjNTG_SQA-unsplash-150x150.jpg"
                  alt="Victoria Falls"
                  className="rounded-md w-28 h-28 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-xl text-blue-500">
                    5-Day Johannesburg - Victoria Falls
                  </h3>
                  <div className="flex items-center text-lg text-muted-foreground mt-1">
                    <Clock className="mr-1 h-4 w-4" />5 Days 4 Nights
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="ghost"
                className="text-xl py-6 text-red-500 hover:text-red-700 hover:bg-red-100"
              >
                <Trash2 className="w-6 h-6 mr-2 mb-[2px]" />
                Remove
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-4">
                <img
                  src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2017/01/samuel-ferrara-npwjNTG_SQA-unsplash-150x150.jpg"
                  alt="Victoria Falls"
                  className="rounded-md w-28 h-28 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-xl text-blue-500">
                    5-Day Johannesburg - Victoria Falls
                  </h3>
                  <div className="flex items-center text-lg text-muted-foreground mt-1">
                    <Clock className="mr-1 h-4 w-4" />5 Days 4 Nights
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="ghost"
                className="text-xl py-6 text-red-500 hover:text-red-700 hover:bg-red-100"
              >
                <Trash2 className="w-6 h-6 mr-2 mb-[2px]" />
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
