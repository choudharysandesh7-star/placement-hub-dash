import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: string;
  studentName: string;
  email: string;
  applicationReason: string;
  status: 'Pending' | 'Done' | 'Rejected';
  submittedDate: string;
}

const initialApplications: Application[] = [
  {
    id: '1',
    studentName: 'John Doe',
    email: 'john.doe@college.edu',
    applicationReason: 'Software Engineering Internship',
    status: 'Pending',
    submittedDate: '2024-09-10',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    email: 'jane.smith@college.edu',
    applicationReason: 'Data Science Position',
    status: 'Done',
    submittedDate: '2024-09-08',
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    email: 'mike.johnson@college.edu',
    applicationReason: 'UI/UX Designer Role',
    status: 'Pending',
    submittedDate: '2024-09-12',
  },
  {
    id: '4',
    studentName: 'Sarah Wilson',
    email: 'sarah.wilson@college.edu',
    applicationReason: 'Marketing Internship',
    status: 'Rejected',
    submittedDate: '2024-09-05',
  },
  {
    id: '5',
    studentName: 'David Brown',
    email: 'david.brown@college.edu',
    applicationReason: 'Full Stack Developer',
    status: 'Done',
    submittedDate: '2024-09-07',
  },
];

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredApplications = applications.filter(app =>
    app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicationReason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (applicationId: string, newStatus: 'Pending' | 'Done' | 'Rejected') => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    
    const application = applications.find(app => app.id === applicationId);
    toast({
      title: "Status Updated",
      description: `${application?.studentName}'s application status changed to ${newStatus}`,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'default';
      case 'Done':
        return 'default';
      case 'Rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'hsl(var(--pending))';
      case 'Done':
        return 'hsl(var(--success))';
      case 'Rejected':
        return 'hsl(var(--destructive))';
      default:
        return 'hsl(var(--muted-foreground))';
    }
  };

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Applications Management</h1>
        <p className="text-muted-foreground mt-2">
          Review and manage student applications for internships and placements.
        </p>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status} className="shadow-[var(--shadow-card)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{status} Applications</p>
                  <p className="text-2xl font-bold text-foreground">{count}</p>
                </div>
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: getStatusColor(status) }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Student Applications</CardTitle>
              <CardDescription>
                Manage and track application statuses
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Application Reason</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.studentName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {application.email}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={application.applicationReason}>
                      {application.applicationReason}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(application.submittedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={application.status}
                      onValueChange={(value: 'Pending' | 'Done' | 'Rejected') =>
                        handleStatusChange(application.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>
                          <Badge 
                            variant={getStatusBadgeVariant(application.status)}
                            style={{ 
                              backgroundColor: getStatusColor(application.status),
                              color: 'white'
                            }}
                          >
                            {application.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getStatusColor('Pending') }}
                            />
                            Pending
                          </div>
                        </SelectItem>
                        <SelectItem value="Done">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getStatusColor('Done') }}
                            />
                            Done
                          </div>
                        </SelectItem>
                        <SelectItem value="Rejected">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getStatusColor('Rejected') }}
                            />
                            Rejected
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No applications found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Applications;