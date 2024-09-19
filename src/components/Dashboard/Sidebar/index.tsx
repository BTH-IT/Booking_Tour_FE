import React from 'react';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  UserCircle,
  Users as UsersIcon,
  Compass,
  Building,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-[#f8f8f8] p-6">
      <h1 className="text-2xl font-bold mb-10 text-gray-800">Logo</h1>
      <nav className="space-y-4">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start hover:text-gray-100 hover:bg-[#5c98f2]',
            activeSection === 'Dashboard'
              ? 'bg-[#5c98f2] text-gray-100'
              : 'text-gray-800',
          )}
          onClick={() => setActiveSection('Dashboard')}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start hover:text-gray-100 hover:bg-[#5c98f2]',
            activeSection === 'Accounts'
              ? 'bg-[#5c98f2] text-gray-100'
              : 'text-gray-800',
          )}
          onClick={() => setActiveSection('Accounts')}
        >
          <UserCircle className="mr-2 h-4 w-4" />
          Accounts
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start hover:text-gray-100 hover:bg-[#5c98f2]',
            activeSection === 'Customers'
              ? 'bg-[#5c98f2] text-gray-100'
              : 'text-gray-800',
          )}
          onClick={() => setActiveSection('Customers')}
        >
          <UsersIcon className="mr-2 h-4 w-4" />
          Customers
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start hover:text-gray-100 hover:bg-[#5c98f2]',
            activeSection === 'Tours'
              ? 'bg-[#5c98f2] text-gray-100'
              : 'text-gray-800',
          )}
          onClick={() => setActiveSection('Tours')}
        >
          <Compass className="mr-2 h-4 w-4" />
          Tours
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start hover:text-gray-100 hover:bg-[#5c98f2]',
            activeSection === 'Hotels'
              ? 'bg-[#5c98f2] text-gray-100'
              : 'text-gray-800',
          )}
          onClick={() => setActiveSection('Hotels')}
        >
          <Building className="mr-2 h-4 w-4" />
          Hotels
        </Button>
      </nav>
    </aside>
  );
}
