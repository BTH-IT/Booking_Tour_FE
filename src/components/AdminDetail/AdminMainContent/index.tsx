import useActiveDashboardTab from '@/hooks/useActiveDashboardTab';
import AdminUser from './AdminUser';

import { adminTabs } from '@/constants/sidebarItem';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import AdminHotel from './AdminHotel';

const tabComponents = {
  user: <AdminUser />,
  hotel: <AdminHotel />,
  // 'change-password': <DashboardChangePassword />,
  // 'tour-my-bookings': <DashboardTourBooking />,
  // 'tour-invoices': <DashboardTourInvoice />,
  // 'tour-reviewList': <DashboardTourReview />,
  // 'wish-list': <DashboardWishList />,
  // 'room-my-bookings': <DashboardRoomBooking />,
  // 'room-invoices': <DashboardRoomInvoice />,
  // 'room-reviewList': <DashboardRoomReview />,
};

export default function AdminMainContent() {
  const { activeTab } = useActiveDashboardTab();

  const renderContent = () => {
    return (
      tabComponents[activeTab as keyof typeof tabComponents] || <AdminUser />
    );
  };

  return (
    <main className='flex-1 py-20'>
      <Breadcrumb className='mx-14 mb-6 font-semibold'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className='text-2xl text-gray-400' href='/admin'>
              Admin
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='text-2xl text-blue-600'>
              {adminTabs[activeTab as keyof typeof adminTabs] ?? 'Users'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {renderContent()}
    </main>
  );
}
