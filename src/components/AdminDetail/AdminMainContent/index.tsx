import AdminDestination from './AdminDestination';
import AdminHotel from './AdminHotel';
import AdminRoom from './AdminRoom';
import AdminRoomBooking from './AdminRoomBooking';
import AdminTour from './AdminTour';
import AdminTourBooking from './AdminTourBooking';
import AdminUser from './AdminUser';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { adminTabs } from '@/constants/sidebarItem';
import useActiveDashboardTab from '@/hooks/useActiveDashboardTab';

const tabComponents = {
  user: <AdminUser />,
  hotel: <AdminHotel />,
  room: <AdminRoom />,
  destination: <AdminDestination />,
  tour: <AdminTour />,
  'tour-booking': <AdminTourBooking />,
  'room-booking': <AdminRoomBooking />,
};

export default function AdminMainContent() {
  const { activeTab } = useActiveDashboardTab();

  const renderContent = () => {
    return (
      tabComponents[activeTab as keyof typeof tabComponents] || <AdminUser />
    );
  };

  return (
    <main className="flex-1 py-20">
      <Breadcrumb className="mx-14 mb-6 font-semibold">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-2xl text-gray-400" href="/admin">
              Admin
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-2xl text-blue-600">
              {adminTabs[activeTab as keyof typeof adminTabs] ?? 'Users'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {renderContent()}
    </main>
  );
}
