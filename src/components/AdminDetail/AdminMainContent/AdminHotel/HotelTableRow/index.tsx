import { TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatPhoneNumber } from '@/utils/constants';
import { ILocation } from 'destination';
import { IHotel } from 'hotel';
import { Ratings } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';
import { ListCollapse, MoreHorizontal, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DetailHotelModal from '../DetailHotelModal';
import CommonModal from '@/components/CommonModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import hotelService from '@/services/HotelService';

const HotelTableRow = ({
  hotel,
  locations,
  hotels,
  setHotels,
}: {
  hotel: IHotel;
  locations: ILocation[];
  hotels: IHotel[];
  setHotels: Dispatch<SetStateAction<IHotel[]>>;
}) => {
  const { toast } = useToast();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRemoveHotel = async (hotelId: string) => {
    try {
      const res = await hotelService.deleteHotel(hotelId);
      if (res) {
        toast({
          title: 'Hotel deleted successfully',
          duration: 2000,
        });
        setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
      }
    } catch (error) {
      console.error('Failed to delete hotel:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to delete hotel!',
      });
    }
  };

  return (
    <>
      <TableRow key={hotel.id}>
        <TableCell className="w-[30%] text-xl text-gray-600 text-ellipsis">
          <span className="w-full text-xl line-clamp-1">{hotel.name}</span>
        </TableCell>
        <TableCell className="w-[30%] text-xl text-gray-600 text-ellipsis">
          <span className="w-full text-xl line-clamp-1">
            {`${hotel.location}, ${locations.find((loc) => loc.code === hotel.locationCode)?.name}`}
          </span>
        </TableCell>
        <TableCell className="w-[15%] text-xl text-gray-600">
          {formatPhoneNumber(hotel.contactInfo)}
        </TableCell>
        <TableCell className="w-[10%] text-xl text-gray-600">
          <Ratings rating={hotel.rate || 0} size={15} variant="yellow" />
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
      <DetailHotelModal
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        hotels={hotels}
        setHotels={setHotels}
        locations={locations}
        hotel={hotel}
      />
      <CommonModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        width={400}
        height={500}
        title="Are you sure you want to delete this hotel?"
        acceptTitle="Delete"
        acceptClassName="text-xl hover:bg-red-50 hover:text-red-700 text-red-600 transition-all duration-400"
        ocClickAccept={async () => {
          await handleRemoveHotel(hotel.id);
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default HotelTableRow;
