import { BarChart3, Database, FileText, Briefcase, Users, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import collegeLogo from '@/assets/college-logo.jpg';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Dynamic Data',
    href: '/dashboard/dynamic-data',
    icon: Database,
  },
  {
    title: 'Applications',
    href: '/dashboard/applications',
    icon: FileText,
  },
  {
    title: 'Internships',
    href: '/dashboard/internships',
    icon: Briefcase,
  },
  {
    title: 'Staff Management',
    href: '/dashboard/staff',
    icon: Users,
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col shadow-[var(--shadow-elevated)]">
      {/* Logo and Title */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <img src={collegeLogo} alt="College Logo" className="w-10 h-10 rounded-lg" />
          <div>
            <h2 className="font-bold text-lg text-foreground">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Placement System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;