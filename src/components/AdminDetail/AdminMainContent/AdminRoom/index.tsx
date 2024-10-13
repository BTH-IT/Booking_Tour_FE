import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import roomService from '@/services/RoomService';
import { IHotel, IRoom } from '@/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search } from 'lucide-react';
import Pagination from '@/components/Pagination';
import RoomTableRow from './RoomTableRow';
import CreateRoomModal from './CreateRoomModal';
import hotelService from '@/services/HotelService';

const ITEMS_PER_PAGE = 6;

const AdminRoom = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rooms.length / ITEMS_PER_PAGE);

  const fetchData = async () => {
    try {
      const [roomRes, hotelRes] = await Promise.all([
        roomService.getAllRooms(),
        hotelService.getAllHotels(),
      ]);

      roomRes?.result
        ? setRooms(roomRes.result)
        : console.error('Failed to fetch rooms');
      hotelRes?.result
        ? setHotels(hotelRes.result)
        : console.error('Failed to fetch hotels');
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  console.log(rooms);

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [rooms, searchTerm]);

  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <main className="flex-1 mx-10 overflow-x-hidden overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between mb-10">
          <div className="relative w-64">
            <Search className="absolute left-2 top-4 h-6 w-6 text-gray-500" />
            <Input
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-96 text-xl text-gray-800 pl-10 py-7 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            className="py-7 text-xl"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add Room
          </Button>
        </div>
        <div className="min-h-[415px] bg-white mb-10 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="!border-solid !border-b-[0.5px] !border-gray-400">
              <TableRow>
                <TableHead className="text-xl text-gray-900 py-5">
                  Room Name
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Hotel Name
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Price
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Availability
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Max Guests
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Rating
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRooms.map((room: IRoom) => (
                <RoomTableRow
                  key={room.id}
                  room={room}
                  hotels={hotels}
                  rooms={rooms}
                  setRooms={setRooms}
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
      <CreateRoomModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        rooms={rooms}
        setRooms={setRooms}
        hotels={hotels}
      />
    </main>
  );
};

export default AdminRoom;
