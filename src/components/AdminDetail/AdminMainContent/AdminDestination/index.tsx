import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import destinationService from '@/services/DestinationService';
import { IDestination } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Plus, Search, Trash } from 'lucide-react';
import { formatDate, formatPhoneNumber } from '@/utils/constants';
import CreateDestinationModal from './CreateDestinationModal';
import EditDestinationModal from './EditDestinationModal';
import Pagination from '@/components/Pagination';
import { Separator } from '@/components/ui/separator';
import roleService from '@/services/RoleService';
import CommonModal from '@/components/CommonModal';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 6;

const AdminDestination = () => {
  const { toast } = useToast();

  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDestination, setCurrentDestination] =
    useState<IDestination | null>(null);
  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);

  const fetchData = async () => {
    try {
      const res = await destinationService.getAllDestinations();

      res?.result
        ? setDestinations(res.result)
        : console.error('Failed to fetch destinations');
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleRemoveDestination = async (destinationId: string) => {
    try {
      const res = await destinationService.deleteDestination(destinationId);
      if (res) {
        toast({
          duration: 2000,
          title: 'Destination deleted successfully!',
        });
        setDestinations(
          destinations.filter(
            (destination) => destination.id !== destinationId,
          ),
        );
      }
    } catch (error) {
      console.error('Failed to delete destination:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to delete destination!',
      });
    }
  };

  return (
    <main className="flex-1 mx-10 overflow-x-hidden overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between mb-10">
          <div className="relative w-64">
            <Search className="absolute left-2 top-4 h-6 w-6 text-gray-500" />
            <Input
              placeholder="Search destinations..."
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
            Add Destination
          </Button>
        </div>
        <div className="min-h-[415px] bg-white mb-10 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="!border-solid !border-b-[0.5px] !border-gray-400">
              <TableRow>
                <TableHead className="text-xl text-gray-900 py-5">
                  Name
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Description
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  URL
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDestinations.map((destination: IDestination) => (
                <TableRow key={destination.id}>
                  <TableCell className="w-[30%] text-xl text-gray-600">
                    {destination.name}
                  </TableCell>
                  <TableCell className="w-[30%] text-xl text-gray-600">
                    {destination.description}
                  </TableCell>
                  <TableCell className="w-[30%] text-xl text-gray-600">
                    {destination.url}
                  </TableCell>
                  <TableCell className="w-[10%] text-center">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="p-2 rounded-full w-12 h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                          <MoreHorizontal className="w-8 h-8" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[100px]" align="end">
                        <DropdownMenuLabel className="text-xl text-gray-800">
                          Actions
                        </DropdownMenuLabel>
                        <Separator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentDestination(destination);
                            setIsEditModalOpen(true);
                          }}
                          className="text-xl py-3 px-2 text-gray-800 cursor-pointer"
                        >
                          <Edit className="w-6 h-6 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentDestination(destination);
                            setIsDeleteModalOpen(true);
                          }}
                          className="py-3 px-2 cursor-pointer"
                        >
                          <Trash className="w-6 h-6 mr-2 text-red-500" />
                          <span className="text-xl text-red-500">Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
      </div>
      <CreateDestinationModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        destinations={destinations}
        setDestinations={setDestinations}
      />
      {currentDestination && (
        <EditDestinationModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          destinations={destinations}
          setDestinations={setDestinations}
          destination={currentDestination}
        />
      )}
      <CommonModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        width={400}
        height={500}
        title="Are you sure you want to delete this destination?"
        acceptTitle="Delete"
        acceptClassName="text-xl hover:bg-red-50 hover:text-red-700 text-red-600 transition-all duration-400"
        ocClickAccept={async () => {
          await handleRemoveDestination(currentDestination?.id || '');
          setIsDeleteModalOpen(false);
        }}
      />
    </main>
  );
};

export default AdminDestination;
