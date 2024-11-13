import DashboardChangePassword from './DashboardChangePassword';
import DashboardEdit from './DashboardEdit';
import DashboardProfile from './DashboardProfile';
import DashboardRoomBooking from './DashboardRoomBooking';
import DashboardRoomWishList from './DashboardRoomWishList';
import DashboardTourBooking from './DashboardTourBooking';
import DashboardTourWishList from './DashboardTourWishList';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  myAccountTabs,
  roomBookingTabs,
  tourBookingTabs,
} from '@/constants/sidebarItem';
import useActiveDashboardTab from '@/hooks/useActiveDashboardTab';

const tabComponents = {
  dashboard: <DashboardProfile />,
  'edit-profile': <DashboardEdit />,
  'change-password': <DashboardChangePassword />,
  'tour-my-bookings': <DashboardTourBooking />,
  'tour-wish-list': <DashboardTourWishList />,
  'room-my-bookings': <DashboardRoomBooking />,
  'room-wish-list': <DashboardRoomWishList />,
};

export default function DashboardMainContent() {
  const { activeTab } = useActiveDashboardTab();
  const tabs = { ...myAccountTabs, ...roomBookingTabs, ...tourBookingTabs };

  const renderContent = () => {
    return (
      tabComponents[activeTab as keyof typeof tabComponents] || (
        <DashboardProfile />
      )
    );
  };

  return (
    <main className="flex-1 py-20">
      {activeTab && activeTab !== 'dashboard' && (
        <Breadcrumb className="mx-14 mb-6 font-semibold">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-2xl text-gray-400"
                href="/dashboard"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-2xl text-blue-600">
                {tabs[activeTab as keyof typeof tabs]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {renderContent()}
    </main>
  );
}
