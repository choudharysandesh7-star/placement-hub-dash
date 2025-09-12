import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, User, Mail, Shield, Users, BookOpen, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  accessLevel: 'Admin' | 'Manager' | 'Staff';
  section: 'Placement' | 'Exam' | 'Office';
  joinDate: string;
}

const initialStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'Placement Head',
    email: 'sarah.johnson@college.edu',
    accessLevel: 'Admin',
    section: 'Placement',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Prof. Michael Brown',
    role: 'Exam Coordinator',
    email: 'michael.brown@college.edu',
    accessLevel: 'Manager',
    section: 'Exam',
    joinDate: '2023-03-20',
  },
  {
    id: '3',
    name: 'Ms. Lisa Davis',
    role: 'Office Administrator',
    email: 'lisa.davis@college.edu',
    accessLevel: 'Staff',
    section: 'Office',
    joinDate: '2023-06-10',
  },
  {
    id: '4',
    name: 'Mr. John Wilson',
    role: 'Placement Coordinator',
    email: 'john.wilson@college.edu',
    accessLevel: 'Staff',
    section: 'Placement',
    joinDate: '2023-08-05',
  },
  {
    id: '5',
    name: 'Dr. Emily Clark',
    role: 'Exam Officer',
    email: 'emily.clark@college.edu',
    accessLevel: 'Manager',
    section: 'Exam',
    joinDate: '2023-09-12',
  },
];

const StaffManagement = () => {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Placement');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    accessLevel: 'Staff' as 'Admin' | 'Manager' | 'Staff',
    section: 'Placement' as 'Placement' | 'Exam' | 'Office',
  });
  const { toast } = useToast();

  const filteredStaff = staff.filter(member => member.section === activeTab);

  const handleAdd = () => {
    const newStaff: StaffMember = {
      id: Date.now().toString(),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
    };
    setStaff([...staff, newStaff]);
    resetForm();
    toast({
      title: "Staff Added",
      description: `${formData.name} has been added to ${formData.section} section.`,
    });
  };

  const handleDelete = (id: string) => {
    const member = staff.find(s => s.id === id);
    setStaff(staff.filter(s => s.id !== id));
    toast({
      title: "Staff Removed",
      description: `${member?.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      email: '',
      accessLevel: 'Staff',
      section: 'Placement',
    });
    setIsDialogOpen(false);
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'Admin':
        return 'hsl(var(--destructive))';
      case 'Manager':
        return 'hsl(var(--warning))';
      case 'Staff':
        return 'hsl(var(--success))';
      default:
        return 'hsl(var(--muted-foreground))';
    }
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'Placement':
        return <Users className="w-4 h-4" />;
      case 'Exam':
        return <BookOpen className="w-4 h-4" />;
      case 'Office':
        return <Building className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getSectionStats = (section: string) => {
    const sectionStaff = staff.filter(s => s.section === section);
    return {
      total: sectionStaff.length,
      admins: sectionStaff.filter(s => s.accessLevel === 'Admin').length,
      managers: sectionStaff.filter(s => s.accessLevel === 'Manager').length,
      staff: sectionStaff.filter(s => s.accessLevel === 'Staff').length,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage staff members across different sections and their access levels.
          </p>
        </div>
        
        <Dialog 
          open={isDialogOpen} 
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Dr. John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role/Position</Label>
                <Input
                  id="role"
                  placeholder="e.g., Placement Coordinator"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="section">Section</Label>
                <Select value={formData.section} onValueChange={(value: 'Placement' | 'Exam' | 'Office') => setFormData({ ...formData, section: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Placement">Placement Section</SelectItem>
                    <SelectItem value="Exam">Exam Section</SelectItem>
                    <SelectItem value="Office">Office Section</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select value={formData.accessLevel} onValueChange={(value: 'Admin' | 'Manager' | 'Staff') => setFormData({ ...formData, accessLevel: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                onClick={handleAdd}
                disabled={!formData.name || !formData.email || !formData.role}
              >
                Add Staff
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Section Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['Placement', 'Exam', 'Office'] as const).map((section) => {
          const stats = getSectionStats(section);
          return (
            <Card key={section} className="shadow-[var(--shadow-card)]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSectionIcon(section)}
                    <span className="font-medium">{section} Section</span>
                  </div>
                  <Badge variant="outline">{stats.total} members</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {stats.admins} Admin • {stats.managers} Manager • {stats.staff} Staff
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>
            Manage staff members by section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Placement" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Placement
              </TabsTrigger>
              <TabsTrigger value="Exam" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Exam
              </TabsTrigger>
              <TabsTrigger value="Office" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Office
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {member.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          style={{
                            backgroundColor: getAccessLevelColor(member.accessLevel),
                            color: 'white',
                            borderColor: getAccessLevelColor(member.accessLevel),
                          }}
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          {member.accessLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(member.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredStaff.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No staff members found in {activeTab} section.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffManagement;