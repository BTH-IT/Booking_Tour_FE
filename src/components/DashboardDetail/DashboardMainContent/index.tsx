import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import useActiveTab from "@/hooks/useActiveTab";
import DashboardProfile from "../DashboardProfile";
import DashboardEdit from "../DashboardEdit";
import DashboardChangePassword from "../DashboardChangePassword";
import DashboardTourBooking from "../DashboardTourBooking";
import DashboardTourInvoice from "../DashboardTourInvoice";
import DashboardTourReview from "../DashboardTourReview";
import DashboardWishList from "../DashboardWishList";
import DashboardRoomBooking from "../DashboardRoomBooking";
import DashboardRoomInvoice from "../DashboardRoomInvoice";
import DashboardRoomReview from "../DashboardRoomReview";

import {
  myAccountTabs,
  roomBookingTabs,
  tourBookingTabs,
} from "@/constants/sidebarItem";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserRound } from "lucide-react";

export default function DashboardMainContent() {
  const { activeTab } = useActiveTab();
  const tabs = { ...myAccountTabs, ...roomBookingTabs, ...tourBookingTabs };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardProfile />;
      case "edit-profile":
        return <DashboardEdit />;
      case "change-password":
        return <DashboardChangePassword />;
      case "tour-my-bookings":
        return <DashboardTourBooking />;
      case "tour-invoices":
        return <DashboardTourInvoice />;
      case "tour-reviews":
        return <DashboardTourReview />;
      case "wish-list":
        return <DashboardWishList />;
      case "room-my-bookings":
        return <DashboardRoomBooking />;
      case "room-invoices":
        return <DashboardRoomInvoice />;
      case "room-reviews":
        return <DashboardRoomReview />;
      default:
        return <DashboardProfile />;
    }
  };

  return (
    <main className="flex-1 py-20">
      {activeTab && activeTab !== "dashboard" && (
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
