import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    icon: DollarSign,
    change: '+20.1% from last month',
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    icon: Users,
    change: '+180.1% from last month',
  },
  {
    title: 'Sales',
    value: '+12,234',
    icon: CreditCard,
    change: '+19% from last month',
  },
  {
    title: 'Active Now',
    value: '+573',
    icon: Activity,
    change: '+201 since last hour',
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-100 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#5c98f2]">
              {stat.value}
            </div>
            <p className="text-xs text-[#5c98f2]">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
