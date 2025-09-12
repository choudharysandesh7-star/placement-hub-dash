import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;