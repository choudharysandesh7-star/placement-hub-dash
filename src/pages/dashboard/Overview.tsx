import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Briefcase, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const statsData = [
  {
    title: 'Total Applications',
    value: '156',
    description: 'This month',
    icon: FileText,
    trend: '+12%',
  },
  {
    title: 'Active Internships',
    value: '24',
    description: 'Currently available',
    icon: Briefcase,
    trend: '+3%',
  },
  {
    title: 'Upcoming Exams',
    value: '8',
    description: 'Next 30 days',
    icon: Calendar,
    trend: '+2',
  },
  {
    title: 'Staff Members',
    value: '42',
    description: 'Active users',
    icon: Users,
    trend: 'stable',
  },
];

const pieData = [
  { name: 'Pending', value: 45, color: 'hsl(var(--pending))' },
  { name: 'Done', value: 85, color: 'hsl(var(--success))' },
  { name: 'Rejected', value: 26, color: 'hsl(var(--destructive))' },
];

const barData = [
  { month: 'Jan', applications: 65, placements: 45 },
  { month: 'Feb', applications: 78, placements: 52 },
  { month: 'Mar', applications: 90, placements: 61 },
  { month: 'Apr', applications: 81, placements: 58 },
  { month: 'May', applications: 95, placements: 67 },
  { month: 'Jun', applications: 102, placements: 73 },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your placement management system.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Status Pie Chart */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Application Status Distribution</CardTitle>
            <CardDescription>Current status of all applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends Bar Chart */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Applications vs Successful Placements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="placements" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New internship posted', company: 'TechCorp Inc.', time: '2 hours ago', type: 'success' },
              { action: 'Application status updated', student: 'John Doe', time: '4 hours ago', type: 'info' },
              { action: 'Exam schedule updated', exam: 'Software Engineering', time: '6 hours ago', type: 'warning' },
              { action: 'New staff member added', name: 'Dr. Jane Smith', time: '1 day ago', type: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.company || activity.student || activity.exam || activity.name}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;