import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import tourService from '@/services/TourService';
import { IDestination, IHotel, ITour } from '@/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search } from 'lucide-react';
import Pagination from '@/components/Pagination';
import TourTableRow from './TourTableRow';
import CreateTourModal from './CreateTourModal';
import destinationService from '@/services/DestinationService';

const ITEMS_PER_PAGE = 6;

const AdminTour = () => {
  const [tours, setTours] = useState<ITour[]>([]);
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tours.length / ITEMS_PER_PAGE);

  const fetchData = async () => {
    try {
      const [tourRes, destinationRes] = await Promise.all([
        tourService.getAllTours(),
        destinationService.getAllDestinations(),
      ]);
      tourRes?.result
        ? setTours(tourRes.result)
        : console.error('Failed to fetch tours');
      destinationRes?.result
        ? setDestinations(destinationRes.result)
        : console.error('Failed to fetch destinations');
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  console.log(tours);

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) =>
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tours, searchTerm]);

  const paginatedTours = filteredTours.slice(
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
              placeholder="Search tours..."
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
            Add Tour
          </Button>
        </div>
        <div className="min-h-[415px] bg-white mb-10 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="!border-solid !border-b-[0.5px] !border-gray-400">
              <TableRow>
                <TableHead className="text-xl text-gray-900 py-5">
                  Tour Name
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Tour Destination
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Max Guests
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Price
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Date From - To
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Sale
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Rating
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTours.map((tour: ITour) => (
                <TourTableRow
                  key={tour.id}
                  tour={tour}
                  destinations={destinations}
                  tours={tours}
                  setTours={setTours}
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
      <CreateTourModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        tours={tours}
        setTours={setTours}
        destinations={destinations}
      />
    </main>
  );
};

export default AdminTour;
