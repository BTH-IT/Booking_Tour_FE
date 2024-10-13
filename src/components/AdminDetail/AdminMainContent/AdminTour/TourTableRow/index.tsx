import { TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { average, formatDate } from '@/utils/constants';
import { ITour } from 'tour';
import { Ratings } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';
import { ListCollapse, MoreHorizontal, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DetailTourModal from '../DetailTourModal';
import CommonModal from '@/components/CommonModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import tourService from '@/services/TourService';
import { IHotel } from 'hotel';

const TourTableRow = ({
  tour,
  tours,
  setTours,
}: {
  tour: ITour;
  tours: ITour[];
  setTours: Dispatch<SetStateAction<ITour[]>>;
}) => {
  const { toast } = useToast();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRemoveTour = async (tourId: string) => {
    try {
      const res = await tourService.deleteTour(tourId);
      if (res) {
        toast({
          title: 'Tour deleted successfully',
          duration: 2000,
        });
        setTours(tours.filter((tour) => tour.id !== tourId));
      }
    } catch (error) {
      console.error('Failed to delete tour:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to delete tour!',
      });
    }
  };

  const rating = average(tour.reviewList.map((r: any) => r.rating));

  return (
    <>
      <TableRow key={tour.id}>
        <TableCell className="w-[20%] text-gray-600 text-ellipsis">
          <span className="w-full text-xl line-clamp-1">{tour.name}</span>
        </TableCell>
        <TableCell className="w-[15%] text-xl text-gray-600 text-ellipsis">
          <span className="w-full text-xl line-clamp-1">destination</span>
        </TableCell>
        <TableCell className="w-[10%] text-xl text-gray-600">
          {tour.maxGuests + ' People'}
        </TableCell>
        <TableCell className="w-[15%] text-xl text-gray-600">
          {tour.price + ' VND'}
        </TableCell>
        <TableCell className="w-[20%] text-xl text-gray-600">
          {formatDate(tour.dateFrom) + ' - ' + formatDate(tour.dateTo)}
        </TableCell>
        <TableCell className="w-[8%] text-xl text-gray-600">
          {tour.salePercent + '%'}
        </TableCell>
        <TableCell className="w-[12%] text-xl text-gray-600">
          <Ratings rating={rating || 0} size={15} variant="yellow" />
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
                  setIsDetailModalOpen(true);
                }}
                className="text-xl py-3 px-2 text-gray-800 cursor-pointer"
              >
                <ListCollapse className="w-6 h-6 mr-2" />
                Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
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
      <DetailTourModal
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        tours={tours}
        setTours={setTours}
        tour={tour}
      />
      <CommonModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        width={400}
        height={500}
        title="Are you sure you want to delete this tour?"
        acceptTitle="Delete"
        acceptClassName="text-xl hover:bg-red-50 hover:text-red-700 text-red-600 transition-all duration-400"
        ocClickAccept={async () => {
          await handleRemoveTour(tour.id);
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default TourTableRow;
