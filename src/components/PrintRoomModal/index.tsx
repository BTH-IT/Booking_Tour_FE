import { IBookingRoom } from 'booking';
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

const PrintRoomModal = ({
  isOpen,
  setIsOpen,
  booking,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  booking: IBookingRoom | null;
}) => {
  if (!booking) return null;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint() {
      setIsOpen(false);
    },
  });

  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);

  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)
  );

  const detail = booking.detailBookingRooms[0];
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
            className="w-full max-w-6xl mx-auto !border-0 shadow-none"
          >
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Booking Invoice #{booking.id}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-10 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xl font-medium"> Reservation Holder:</p>
                  <p className="text-lg">{booking.user.fullname}</p>
                </div>
                <div>
                  <p className="text-xl font-medium"> Reservation Date:</p>
                  <p className="text-lg">
                    {formatDate(new Date(booking.createAt))}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-medium">Check-in:</p>
                  <p className="text-lg">{formatDate(checkIn)}</p>
                </div>
                <div>
                  <p className="text-xl font-medium">Check-out:</p>
                  <p className="text-lg">{formatDate(checkOut)}</p>
                </div>
                <div>
                  <p className="text-xl font-medium">Total Nights:</p>
                  <p className="text-lg">{nights}</p>
                </div>
                <div>
                  <p className="text-xl font-medium">Status:</p>
                  <p className="text-lg">{booking.status}</p>
                </div>
              </div>
              <Table>
                <TableHeader className="!border-solid !border-b-[1px] border-gray-200">
                  <TableRow>
                    <TableHead className="text-xl w-[40%]">Room</TableHead>
                    <TableHead className="text-xl text-right">Adults</TableHead>
                    <TableHead className="text-xl text-right">
                      Children
                    </TableHead>
                    <TableHead className="text-xl text-right">
                      Price per Night
                    </TableHead>
                    <TableHead className="text-xl text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={detail.id}>
                    <TableCell className="text-lg font-medium">
                      {detail.room.name}
                    </TableCell>
                    <TableCell className="text-lg text-right">
                      {detail.adults}
                    </TableCell>
                    <TableCell className="text-lg text-right">
                      {detail.children}
                    </TableCell>
                    <TableCell className="text-lg text-right">
                      ${detail.room.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-lg text-right">
                      ${(detail.room.price * nights).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <Separator className="my-4" />
            <CardFooter>
              <div className="ml-auto text-right">
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    Total Guests: {booking.numberOfPeople}
                  </p>
                  {detail.price > detail.room.price * nights && (
                    <p className="text-lg font-medium">
                      Tips: $
                      {(detail.price - detail.room.price * nights).toFixed(2)}
                    </p>
                  )}
                  <p className="text-xl font-bold !mt-6">
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

export default PrintRoomModal;
