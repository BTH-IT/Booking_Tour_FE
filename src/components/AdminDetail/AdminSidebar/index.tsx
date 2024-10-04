import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { adminTabs } from '@/constants/sidebarItem';
import useActiveAdminTab from '@/hooks/useActiveAdminTab';
import { authActions } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import {
  ConciergeBell,
  Hotel,
  Lamp,
  LogOut,
  MapPin,
  TramFront,
  UserRound,
} from 'lucide-react';

const iconMap = {
  user: UserRound,
  tour: TramFront,
  room: Lamp,
  hotel: Hotel,
  destination: MapPin,
  booking: ConciergeBell,
};

export default function AdminSidebar() {
  const dispatch = useAppDispatch();

  const { activeTab, setActiveTab } = useActiveAdminTab();

  return (
    <aside className="w-[300px] bg-white shadow-md">
      <div className="p-6">
        <nav className="space-y-6">
          <div>
            <ul className="pt-4 pb-20">
              <div className="my-6">
                {Object.keys(adminTabs).map((tab) => {
                  const Icon = iconMap[tab as keyof typeof iconMap];
                  return (
                    <li key={tab}>
                      <Button
                        variant="ghost"
                        className={`flex gap-3 text-2xl py-8 my-5 w-full justify-start bg-white ${
                          activeTab === tab
                            ? 'text-blue-600 bg-blue-50 hover:text-blue-600 hover:bg-blue-50'
                            : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        <Icon className="mr-2 h-6 w-6" />
                        {adminTabs[tab as keyof typeof adminTabs]}
                      </Button>
                    </li>
                  );
                })}
              </div>
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
