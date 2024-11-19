import { IBookingTour } from 'booking';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/constants';

const PrintTourModal = ({
  isOpen,
  setIsOpen,
  booking,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  booking: IBookingTour | null;
}) => {
  if (!booking) return null;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint() {
      setIsOpen(false);
    },
  });

  const discountedPrice =
    booking.schedule.tour.price * (1 - booking.schedule.tour.salePercent / 100);
  const days = Math.ceil(
    (new Date(booking.schedule.dateEnd).getTime() -
      new Date(booking.schedule.dateStart).getTime()) /
      (1000 * 3600 * 24)
  );
  console.log(booking);

  setTimeout(() => {
    reactToPrintFn();
  }, 500);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-screen sm:w-screen sm:h-screen overflow-y-scroll no-scrollbar !px-0">
        <DialogHeader>
          <DialogTitle />
          <Card
            ref={contentRef}
            className="w-full max-w-5xl mx-auto !border-0 shadow-none"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Tour Booking Invoice #{booking.id}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Tour Name:</p>
                  <p>{booking.schedule.tour.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status:</p>
                  {booking.status}
                </div>
                <div>
                  <p className="text-sm font-medium">Start Date:</p>
                  <p>{formatDate(new Date(booking.schedule.dateStart))}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">End Date:</p>
                  <p>{formatDate(new Date(booking.schedule.dateEnd))}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duration:</p>
                  <p>{days} days</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Number of Seats:</p>
                  <p>{booking.seats}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">Travellers</h3>
              <Table>
                <TableHeader>
                  <TableRow className="!border-solid !border-b-[1px] border-gray-200">
                    <TableHead>Full Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {booking.travellers.map((traveller: any, idx: number) => (
                    <TableRow
                      className="!border-solid !border-b-[1px] border-gray-200"
                      key={idx}
                    >
                      <TableCell>{traveller.fullname}</TableCell>
                      <TableCell>{traveller.gender}</TableCell>
                      <TableCell>{traveller.age}</TableCell>
                      <TableCell>{traveller.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Pricing Details
              </h3>
              <Table>
                <TableBody>
                  <TableRow className="!border-solid !border-b-[1px] border-gray-200">
                    <TableCell>Base Price</TableCell>
                    <TableCell className="text-right">
                      ${booking.schedule.tour.price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow className="!border-solid !border-b-[1px] border-gray-200">
                    <TableCell>
                      Discount ({booking.schedule.tour.salePercent}%)
                    </TableCell>
                    <TableCell className="text-right">
                      -$
                      {(booking.schedule.tour.price - discountedPrice).toFixed(
                        2
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow className="!border-solid !border-b-[1px] border-gray-200">
                    <TableCell>Lunch</TableCell>
                    <TableCell className="text-right">
                      {booking.isLunch ? 'Included' : 'Not Included'}
                    </TableCell>
                  </TableRow>
                  <TableRow className="!border-solid !border-b-[1px] border-gray-200">
                    <TableCell>Guide Tip</TableCell>
                    <TableCell className="text-right">
                      {booking.isTips ? 'Included' : 'Not Included'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Entrance Tickets</TableCell>
                    <TableCell className="text-right">
                      {booking.isEntranceTicket ? 'Included' : 'Not Included'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <Separator className="my-4" />
            <CardFooter>
              <div className="ml-auto text-right">
                <div className="space-y-1">
                  <p className="text-lg font-bold">
                    Total Amount: ${booking.priceTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PrintTourModal;
