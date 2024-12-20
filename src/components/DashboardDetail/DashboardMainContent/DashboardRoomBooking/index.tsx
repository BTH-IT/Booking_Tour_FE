import { IBookingRoom } from 'booking';
import { Ban, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Pagination from '@/components/Pagination';
import PrintRoomModal from '@/components/PrintRoomModal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bookingStatuses } from '@/constants/bookingStatus';
import bookingService from '@/services/BookingService';
import { formatDate, logError } from '@/utils/constants';

const ITEMS_PER_PAGE = 4;

export default function DashboardRoomBooking() {
  const [bookings, setBookings] = useState<IBookingRoom[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeStatus, setActiveStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState<IBookingRoom | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getCurrentUserBookingRooms();
        if (res) {
          setBookings(res.result.reverse());
        }
        setIsMounted(true);
      } catch (error) {
        logError(error);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (booking) => activeStatus === 'all' || booking.status === activeStatus
  );

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const cancelBookingHandler = async (bookingId: string) => {
    try {
      const res = await bookingService.cancelBookingRoom(bookingId);
      if (res) {
        toast.success('Cancel booking successfully');

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: 'cancelled' }
              : booking
          )
        );
      }
    } catch (error) {
      logError(error);
    }
  };

  return (
    <>
      {isMounted && (
        <section className="container px-16 py-5">
          <Tabs defaultValue="all" className="w-full bg-white">
            <TabsList className="w-fit bg-white h-fit grid-cols-3 lg:grid-cols-9">
              {bookingStatuses.map((status) => (
                <TabsTrigger
                  key={status}
                  className="border-l-[1px] border-gray-300 px-6 font-normal text-center text-[17px] text-gray-400 cursor-pointer underline-offset-8 !shadow-none data-[state=active]:text-blue-500 data-[state=active]:underline"
                  value={status.toLowerCase()}
                  onClick={() => setActiveStatus(status.toLowerCase())}
                >
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="!min-h-[523px]">
            <Table className="mt-10 border-2">
              <TableHeader className="border-solid border-b-[1px] border-gray-200">
                <TableRow>
                  <TableHead className="text-2xl py-6 w-[40%]">
                    Room Name
                  </TableHead>
                  <TableHead className="text-2xl py-6 w-[25%]">
                    Check in - Check out
                  </TableHead>
                  <TableHead className="text-2xl py-6 w-[20%]">Total</TableHead>
                  <TableHead className="text-2xl py-6 w-[15%]">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <img
                          src={booking.detailBookingRooms[0].room.images[0]}
                          alt="Room Image"
                          className="rounded-md w-28 h-28 object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-xl text-blue-500">
                            {booking.detailBookingRooms[0].room.name}
                          </h3>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xl">
                        {`${formatDate(booking.checkIn)} - ${formatDate(
                          booking.checkOut
                        )}`}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xl">
                        {booking.priceTotal.toFixed(2)} $
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="text-xl">
                        {booking.status === 'pending' ? (
                          <span className="text-xl text-yellow-500">
                            Pending
                          </span>
                        ) : booking.status === 'done' ? (
                          <span className="text-xl text-green-500">Done</span>
                        ) : (
                          <span className="text-xl text-red-500">
                            Cancelled
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          type="button"
                          className="text-white rounded-full w-12 h-12 p-3 bg-green-400 hover:bg-green-500 hover:text-white"
                          onClick={() => {
                            setIsModalOpen(true);
                            setBooking(booking);
                          }}
                        >
                          <Printer className="w-8 h-8" />
                        </Button>
                        <Button
                          variant="destructive"
                          type="button"
                          disabled={
                            booking.status !== 'pending' ||
                            new Date().getTime() -
                              new Date(booking.createAt).getTime() >
                              86400000
                          }
                          className="flex items-center space-x-2 rounded-3xl py-6"
                          onClick={() => {
                            cancelBookingHandler(booking.id);
                          }}
                        >
                          <p className="text-xl">Cancel</p>
                          <Ban size={15} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
          <PrintRoomModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            booking={booking}
          />
        </section>
      )}
    </>
  );
}
