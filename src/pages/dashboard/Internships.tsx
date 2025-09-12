import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, ExternalLink, Edit, Trash2, Building, Clock, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Internship {
  id: string;
  title: string;
  companyName: string;
  duration: string;
  applyLink: string;
  status: 'Active' | 'Closed' | 'Draft';
  postedDate: string;
  applicants: number;
}

const initialInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    companyName: 'TechCorp Inc.',
    duration: '3 months',
    applyLink: 'https://techcorp.com/apply/intern-2024',
    status: 'Active',
    postedDate: '2024-09-01',
    applicants: 23,
  },
  {
    id: '2',
    title: 'Data Science Intern',
    companyName: 'DataWorks Ltd.',
    duration: '6 months',
    applyLink: 'https://dataworks.com/careers/intern',
    status: 'Active',
    postedDate: '2024-09-05',
    applicants: 31,
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    companyName: 'DesignStudio Pro',
    duration: '4 months',
    applyLink: 'https://designstudio.com/jobs/ux-intern',
    status: 'Closed',
    postedDate: '2024-08-20',
    applicants: 18,
  },
  {
    id: '4',
    title: 'Marketing Intern',
    companyName: 'BrandMax Agency',
    duration: '3 months',
    applyLink: 'https://brandmax.com/careers/marketing-intern',
    status: 'Active',
    postedDate: '2024-09-10',
    applicants: 12,
  },
];

const Internships = () => {
  const [internships, setInternships] = useState<Internship[]>(initialInternships);
  const [editingItem, setEditingItem] = useState<Internship | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    duration: '',
    applyLink: '',
  });
  const { toast } = useToast();

  const filteredInternships = internships.filter(internship =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newInternship: Internship = {
      id: Date.now().toString(),
      ...formData,
      status: 'Active',
      postedDate: new Date().toISOString().split('T')[0],
      applicants: 0,
    };
    setInternships([...internships, newInternship]);
    resetForm();
    toast({
      title: "Internship Added",
      description: "New internship has been posted successfully.",
    });
  };

  const handleEdit = (internship: Internship) => {
    setEditingItem(internship);
    setFormData({
      title: internship.title,
      companyName: internship.companyName,
      duration: internship.duration,
      applyLink: internship.applyLink,
    });
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingItem) return;
    
    setInternships(internships.map(item => 
      item.id === editingItem.id 
        ? { ...item, ...formData }
        : item
    ));
    resetForm();
    toast({
      title: "Internship Updated",
      description: "Internship details have been updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setInternships(internships.filter(item => item.id !== id));
    toast({
      title: "Internship Deleted",
      description: "Internship has been removed successfully.",
      variant: "destructive",
    });
  };

  const resetForm = () => {
    setFormData({ title: '', companyName: '', duration: '', applyLink: '' });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Closed':
        return 'secondary';
      case 'Draft':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'hsl(var(--success))';
      case 'Closed':
        return 'hsl(var(--muted-foreground))';
      case 'Draft':
        return 'hsl(var(--warning))';
      default:
        return 'hsl(var(--muted-foreground))';
    }
  };

  const activeCount = internships.filter(i => i.status === 'Active').length;
  const totalApplicants = internships.reduce((sum, i) => sum + i.applicants, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Internship Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage available internship opportunities and track applications.
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
              Add New Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Internship' : 'Add New Internship'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Internship Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Software Development Intern"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="e.g., TechCorp Inc."
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3 months"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="applyLink">Application Link</Label>
                <Input
                  id="applyLink"
                  placeholder="https://company.com/apply"
                  value={formData.applyLink}
                  onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                onClick={editingItem ? handleUpdate : handleAdd}
                disabled={!formData.title || !formData.companyName}
              >
                {editingItem ? 'Update' : 'Add'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Internships</p>
                <p className="text-2xl font-bold text-foreground">{activeCount}</p>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold text-foreground">{totalApplicants}</p>
              </div>
              <Badge className="text-lg px-3 py-1">{totalApplicants}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">
                  {internships.filter(i => new Date(i.postedDate).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Available Internships</CardTitle>
              <CardDescription>
                Manage and track internship opportunities
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Apply Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInternships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell className="font-medium">
                    {internship.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      {internship.companyName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {internship.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusBadgeVariant(internship.status)}
                      style={{
                        backgroundColor: getStatusColor(internship.status),
                        color: 'white'
                      }}
                    >
                      {internship.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {internship.applicants}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={internship.applyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Apply
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(internship)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(internship.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredInternships.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No internships found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Internships;