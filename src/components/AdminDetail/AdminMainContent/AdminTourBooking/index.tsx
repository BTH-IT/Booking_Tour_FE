import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import BookingTableRow from './BookingTableRow';

import Pagination from '@/components/Pagination';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useSignalR from '@/hooks/useSignalR';
import bookingService from '@/services/BookingService';
import { IBookingTour } from '@/types';

const ITEMS_PER_PAGE = 6;

const AdminTourBooking = () => {
  const signalBookingTour = useSignalR('BookingTourEvent');

  const [bookings, setBookings] = useState<IBookingTour[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const fetchData = async () => {
    try {
      const res = await bookingService.getAllBookingTours();
      res && setBookings(res.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (signalBookingTour) {
      setBookings((prev) => {
        switch (signalBookingTour.type) {
          case 'CREATE':
            return [signalBookingTour.data, ...prev];
          case 'UPDATE':
            return prev.map((booking) =>
              booking.id === signalBookingTour.data.id
                ? signalBookingTour.data
                : booking
            );
          default:
            return prev;
        }
      });
    }
  }, [signalBookingTour]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const bookingName = booking.schedule.tour.name.toLowerCase();
      const status = booking.status.toLowerCase();
      const search = searchTerm.toLowerCase();
      return bookingName.includes(search) || status.includes(search);
    });
  }, [bookings, searchTerm]);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="flex-1 mx-10 overflow-x-hidden overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between mb-10">
          <div className="relative w-64">
            <Search className="absolute left-2 top-4 h-6 w-6 text-gray-500" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-96 text-xl text-gray-800 pl-10 py-7 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <div className="min-h-[415px] bg-white mb-10 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="!border-solid !border-b-[0.5px] !border-gray-400">
              <TableRow>
                <TableHead className="text-xl text-gray-900 py-5">
                  Booking ID
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Tour Name
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Total Price
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Date From - To
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Total People
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBookings.map((booking: IBookingTour) => (
                <BookingTableRow
                  key={booking.id}
                  booking={booking}
                  setBookings={setBookings}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
};

export default AdminTourBooking;
