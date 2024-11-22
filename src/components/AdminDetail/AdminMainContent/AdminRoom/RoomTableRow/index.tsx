import { IHotel } from 'hotel';
import { ListCollapse, MoreHorizontal, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { IRoom } from 'room';

import DetailRoomModal from '../DetailRoomModal';

import CommonModal from '@/components/CommonModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ratings } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import { TableCell, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import roomService from '@/services/RoomService';
import { average } from '@/utils/constants';

const RoomTableRow = ({
  room,
  hotels,
  rooms,
  setRooms,
}: {
  room: IRoom;
  hotels: IHotel[];
  rooms: IRoom[];
  setRooms: Dispatch<SetStateAction<IRoom[]>>;
}) => {
  const { toast } = useToast();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRemoveRoom = async (roomId: string) => {
    try {
      const res = await roomService.deleteRoom(roomId);
      if (res) {
        toast({
          title: 'Room deleted successfully',
          duration: 2000,
        });
        setRooms(rooms.filter((room) => room.id !== roomId));
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to delete room!',
      });
    }
  };

  const rating = average(room.reviews.map((r: any) => r.rating));

  return (
    <>
      <TableRow key={room.id}>
        <TableCell className="w-[24%] text-gray-600 text-ellipsis">
          <span className="w-full text-xl line-clamp-1">{room.name}</span>
        </TableCell>
        <TableCell className="w-[24%] text-xl text-gray-600 text-ellipsis">
          <span className="w-full text-xl line-clamp-1">{room.hotel.name}</span>
        </TableCell>
        <TableCell className="w-[15%] text-xl text-gray-600">
          {room.price + '$'}
        </TableCell>
        <TableCell className="w-[13%] text-xl text-gray-600">
          {room.isAvailable ? 'Available' : 'Not Available'}
        </TableCell>
        <TableCell className="w-[12%] text-xl text-gray-600">
          {room.maxGuests + ' Guests'}
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
      <DetailRoomModal
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        rooms={rooms}
        setRooms={setRooms}
        room={room}
        hotels={hotels}
      />
      <CommonModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        width={400}
        height={500}
        title="Are you sure you want to delete this room?"
        acceptTitle="Delete"
        acceptClassName="text-xl hover:bg-red-50 hover:text-red-700 text-red-600 transition-all duration-400"
        ocClickAccept={async () => {
          await handleRemoveRoom(room.id);
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default RoomTableRow;
