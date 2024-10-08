import DashboardSidebar from '../DashboardDetail/DashboardSidebar';
import DashboardMainContent from '../DashboardDetail/DashboardMainContent';

export default function AdminContent() {
  return (
    <div className="flex h-full bg-white">
      <DashboardSidebar />
      <DashboardMainContent />
    </div>
  );
}
