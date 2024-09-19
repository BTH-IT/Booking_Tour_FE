import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const customers = [
  {
    name: 'Kayla',
    country: 'Jordan',
    email: 'kayla.lopez.1@slingacademy.com',
    company: 'Herbalist',
    gender: 'female',
  },
  {
    name: 'Kayla',
    country: 'Jordan',
    email: 'kayla.lopez.1@slingacademy.com',
    company: 'Herbalist',
    gender: 'female',
  },
  {
    name: 'Kayla',
    country: 'Jordan',
    email: 'kayla.lopez.1@slingacademy.com',
    company: 'Herbalist',
    gender: 'female',
  },
  {
    name: 'Kayla',
    country: 'Jordan',
    email: 'kayla.lopez.1@slingacademy.com',
    company: 'Herbalist',
    gender: 'female',
  },
  {
    name: 'Kayla',
    country: 'Jordan',
    email: 'kayla.lopez.1@slingacademy.com',
    company: 'Herbalist',
    gender: 'female',
  },
  {
    name: 'Kayla',
    country: 'Jordan',
    email: 'kayla.lopez.1@slingacademy.com',
    company: 'Herbalist',
    gender: 'female',
  },
  {
    name: 'Kayla',
    country: 'Jordan',
    email: 'kayla.lopez.1@slingacademy.com',
    company: 'Herbalist',
    gender: 'female',
  },
];

export default function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Customers</h2>
      <Card className="bg-gray-100 border-gray-700 pt-6">
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search Customers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md h-12 bg-gray-100 text-gray-800 border-[#5c98f2]"
            />
            <Button className="p-6 bg-[#5c98f2] hover:bg-[#4b7cc6]">
              + Add New
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-800 font-bold">Name</TableHead>
                <TableHead className="text-gray-800 font-bold">
                  Country
                </TableHead>
                <TableHead className="text-gray-800 font-bold">Email</TableHead>
                <TableHead className="text-gray-800 font-bold">
                  Company
                </TableHead>
                <TableHead className="text-gray-800 font-bold">
                  Gender
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow className="border-b-2 border-black" key={index}>
                  <TableCell className="font-medium text-gray-900">
                    {customer.name}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {customer.country}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {customer.company}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {customer.gender}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
