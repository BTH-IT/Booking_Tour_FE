import AdminSidebar from '../AdminDetail/AdminSidebar';
import AdminMainContent from '../AdminDetail/AdminMainContent';

export default function DashboardContent() {
  return (
    <div className="flex h-full bg-white">
      <AdminSidebar />
      <AdminMainContent />
    </div>
  );
}
