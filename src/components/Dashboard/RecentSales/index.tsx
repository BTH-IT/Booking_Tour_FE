import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentSales = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
];

export default function RecentSales() {
  return (
    <Card className="col-span-3 bg-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-800">Recent Sales</CardTitle>
        <p className="text-sm text-gray-700">You made 265 sales this month.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentSales.map((sale, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`/placeholder.svg?height=36&width=36`}
                  alt="Avatar"
                />
                <AvatarFallback>
                  {sale.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-bold leading-none text-gray-800">
                  {sale.name}
                </p>
                <p className="text-sm text-gray-800">{sale.email}</p>
              </div>
              <div className="ml-auto font-medium text-gray-700">
                {sale.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
