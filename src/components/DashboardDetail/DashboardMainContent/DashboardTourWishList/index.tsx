import { Clock, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ITour } from 'tour';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const formatter = new Intl.DateTimeFormat('vi', { month: 'short' });

export default function DashboardTourWishList() {
  const [tours, setTours] = useState<ITour[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tours = localStorage.getItem('tour-wish-list');
    if (tours) {
      setTours(JSON.parse(tours));
    }
  }, []);

  const removeTour = (id: string) => {
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
    localStorage.setItem('tour-wish-list', JSON.stringify(updatedTours));
  };

  return (
    <section className="container mx-auto p-4">
      <Table className="mt-10 border-2">
        <TableHeader className="border-solid border-b-[1px] border-gray-200">
          <TableRow>
            <TableHead className="text-2xl py-6 w-[85%]">Tour Name</TableHead>
            <TableHead className="text-2xl py-6 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell onClick={() => navigate(`/tour/${tour.id}`)}>
                <div className="flex items-center space-x-4">
                  <img
                    src={tour.imageList[0]}
                    alt="Tour Image"
                    className="rounded-md w-28 h-28 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-xl text-blue-500">
                      {tour.name}
                    </h3>
                    <div className="flex items-center text-lg text-muted-foreground mt-1">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatter.format(new Date(tour.dateFrom))} -{' '}
                      {formatter.format(new Date(tour.dateTo))}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  className="text-xl py-6 text-red-500 hover:text-red-700 hover:bg-red-100"
                  onClick={() => removeTour(tour.id)}
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
