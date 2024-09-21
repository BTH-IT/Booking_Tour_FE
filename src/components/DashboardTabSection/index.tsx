import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Edit,
  Key,
  BookOpen,
  FileText,
  Star,
  Heart,
  Phone,
} from "lucide-react";

const iconMap = {
  dashboard: LayoutDashboard,
  "edit-profile": Edit,
  "change-password": Key,
  "tour-my-bookings": BookOpen,
  "tour-invoices": FileText,
  "tour-reviews": Star,
  "wish-list": Heart,
  "room-my-bookings": BookOpen,
  "room-invoices": FileText,
  "room-reviews": Star,
  help: Phone,
};

interface TabSectionProps {
  title: string;
  tabs: Record<string, string>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabSection: React.FC<TabSectionProps> = ({
  title,
  tabs,
  activeTab,
  setActiveTab,
}) => (
  <>
    <h2 className="text-3xl font-serif text-gray-800 font-bold">{title}</h2>
    <div className="my-6">
      {Object.keys(tabs).map((tab) => {
        const Icon = iconMap[tab as keyof typeof iconMap];
        return (
          <li key={tab}>
            <Button
              variant="ghost"
              className={`flex gap-3 text-2xl py-8 w-full my-1 justify-start bg-white ${
                activeTab === tab
                  ? "text-blue-600 bg-blue-50 hover:text-blue-600 hover:bg-blue-50"
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <Icon className="mr-2 h-6 w-6" />
              {tabs[tab as keyof typeof tabs]}
            </Button>
          </li>
        );
      })}
    </div>
  </>
);

export default TabSection;
