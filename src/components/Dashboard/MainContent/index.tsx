import DashboardStats from '../DashboardStats';
import RecentSales from '../RecentSales';
import CustomersTable from '../CustomersTable';

interface MainContentProps {
  activeSection: string;
}

export default function MainContent({ activeSection }: MainContentProps) {
  switch (activeSection) {
    case 'Dashboard':
      return (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Hi, Welcome back 👋
          </h1>
          <DashboardStats />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <p className="text-gray-800">Overview content goes here</p>
            </div>
            <RecentSales />
          </div>
        </>
      );
    case 'Customers':
      return <CustomersTable />;
    case 'Accounts':
    case 'Tours':
    case 'Hotels':
      return (
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {activeSection} Management
        </h2>
      );
    default:
      return (
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Select a section
        </h2>
      );
  }
}
