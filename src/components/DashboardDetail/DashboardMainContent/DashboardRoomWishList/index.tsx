import { MapPin, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IRoom } from 'room';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DashboardRoomWishList() {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    const rooms = localStorage.getItem('room-wish-list');
    if (rooms) {
      setRooms(JSON.parse(rooms));
    }
  }, []);

  const removeRoom = (id: string) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    localStorage.setItem('room-wish-list', JSON.stringify(updatedRooms));
  };

  return (
    <section className="container mx-auto p-4">
      <Table className="mt-10 border-2">
        <TableHeader className="border-solid border-b-[1px] border-gray-200">
          <TableRow>
            <TableHead className="text-2xl py-6 w-[85%]">Room Name</TableHead>
            <TableHead className="text-2xl py-6 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <img
                    src={room.images[0]}
                    alt="Room Image"
                    className="rounded-md w-28 h-28 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-xl text-blue-500">
                      {room.name}
                    </h3>
                    <div className="flex items-center text-lg text-muted-foreground mt-1">
                      <MapPin className="mr-1 h-4 w-4" /> {room.hotel.location}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  className="text-xl py-6 text-red-500 hover:text-red-700 hover:bg-red-100"
                  onClick={() => removeRoom(room.id)}
                >
                  <Trash2 className="w-6 h-6 mr-2 mb-[2px]" />
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
