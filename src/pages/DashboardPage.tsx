import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import MainContent from '@/components/Dashboard/MainContent';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-[#eeeeee] text-gray-800">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 border-gray-300 border-l-[1px] p-8 overflow-auto">
        <MainContent activeSection={activeSection} />
      </main>
    </div>
  );
}
