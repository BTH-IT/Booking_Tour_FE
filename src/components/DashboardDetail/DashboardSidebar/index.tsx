import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import TabSection from '@/components/DashboardTabSection';
import useActiveDashboardTab from '@/hooks/useActiveDashboardTab';
import { authActions } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import {
  myAccountTabs,
  roomBookingTabs,
  tourBookingTabs,
} from '@/constants/sidebarItem';
import { LogOut } from 'lucide-react';

export default function DashboardSidebar() {
  const dispatch = useAppDispatch();

  const { activeTab, setActiveTab } = useActiveDashboardTab();

  return (
    <aside className="w-[300px] bg-white shadow-md">
      <div className="p-6">
        <nav className="space-y-6">
          <div>
            <ul className="pt-12 pb-20">
              <TabSection
                title="My Account"
                tabs={myAccountTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <TabSection
                title="Tour Booking"
                tabs={tourBookingTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <TabSection
                title="Room Booking"
                tabs={roomBookingTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <Separator className="my-3" />
              <Button
                variant="ghost"
                className="flex gap-3 text-2xl w-full my-1 py-8 justify-start bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  dispatch(authActions.logout());
                }}
              >
                <LogOut className="mr-2 h-6 w-6" /> Sign Out
              </Button>
              <Separator className="my-3" />
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
