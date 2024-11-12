import DashboardMainContent from '../DashboardDetail/DashboardMainContent';
import DashboardSidebar from '../DashboardDetail/DashboardSidebar';

export default function DashboardContent() {
  return (
    <div className="flex h-full bg-white">
      <DashboardSidebar />
      <DashboardMainContent />
    </div>
  );
}
