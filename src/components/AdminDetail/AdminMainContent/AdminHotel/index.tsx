import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import hotelService from '@/services/HotelService';
import { IHotel, ILocation } from '@/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search } from 'lucide-react';
import Pagination from '@/components/Pagination';
import destinationService from '@/services/DestinationService';
import HotelTableRow from './HotelTableRow';
import CreateHotelModal from './CreateHotelModal';

const ITEMS_PER_PAGE = 6;

const AdminHotel = () => {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(hotels.length / ITEMS_PER_PAGE);

  const fetchData = async () => {
    try {
      const [hotelRes, locationRes] = await Promise.all([
        hotelService.getAllHotels(),
        destinationService.getCities(),
      ]);

      hotelRes?.result
        ? setHotels(hotelRes.result)
        : console.error('Failed to fetch hotels');
      locationRes?.data
        ? setLocations(locationRes.data)
        : console.error('Failed to fetch locations');
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.contactInfo.includes(searchTerm),
  );

  const paginatedHotels = filteredHotels.slice(
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
              placeholder="Search hotels..."
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
            Add Hotel
          </Button>
        </div>
        <div className="min-h-[415px] bg-white mb-10 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="!border-solid !border-b-[0.5px] !border-gray-400">
              <TableRow>
                <TableHead className="text-xl text-gray-900 py-5">
                  Hotel Name
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Location
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Contact Info
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Rate
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedHotels.map((hotel: IHotel) => (
                <HotelTableRow
                  key={hotel.id}
                  hotel={hotel}
                  locations={locations}
                  hotels={hotels}
                  setHotels={setHotels}
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
      <CreateHotelModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        hotels={hotels}
        setHotels={setHotels}
        locations={locations}
      />
    </main>
  );
};

export default AdminHotel;
