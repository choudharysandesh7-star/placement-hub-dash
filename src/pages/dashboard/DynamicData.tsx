import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus, Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExamData {
  id: string;
  examDate: string;
  timetable: string;
  driveLink: string;
  generalQuery: string;
}

const initialData: ExamData[] = [
  {
    id: '1',
    examDate: '2024-10-15',
    timetable: 'Mid-Term Schedule.pdf',
    driveLink: 'https://drive.google.com/file/d/123abc',
    generalQuery: 'Contact placement office for queries',
  },
  {
    id: '2',
    examDate: '2024-11-20',
    timetable: 'Final Exam Schedule.pdf',  
    driveLink: 'https://drive.google.com/file/d/456def',
    generalQuery: 'Exam hall assignments will be posted soon',
  },
  {
    id: '3',
    examDate: '2024-12-10',
    timetable: 'Placement Test Schedule.pdf',
    driveLink: 'https://drive.google.com/file/d/789ghi',
    generalQuery: 'Bring ID proof and calculator',
  },
];

const DynamicData = () => {
  const [data, setData] = useState<ExamData[]>(initialData);
  const [editingItem, setEditingItem] = useState<ExamData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<ExamData, 'id'>>({
    examDate: '',
    timetable: '',
    driveLink: '',
    generalQuery: '',
  });
  const { toast } = useToast();

  const handleAdd = () => {
    const newItem: ExamData = {
      id: Date.now().toString(),
      ...formData,
    };
    setData([...data, newItem]);
    setFormData({ examDate: '', timetable: '', driveLink: '', generalQuery: '' });
    setIsDialogOpen(false);
    toast({
      title: "Data Added",
      description: "New exam data has been added successfully.",
    });
  };

  const handleEdit = (item: ExamData) => {
    setEditingItem(item);
    setFormData({
      examDate: item.examDate,
      timetable: item.timetable,
      driveLink: item.driveLink,
      generalQuery: item.generalQuery,
    });
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingItem) return;
    
    setData(data.map(item => 
      item.id === editingItem.id 
        ? { ...item, ...formData }
        : item
    ));
    setEditingItem(null);
    setFormData({ examDate: '', timetable: '', driveLink: '', generalQuery: '' });
    setIsDialogOpen(false);
    toast({
      title: "Data Updated",
      description: "Exam data has been updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    toast({
      title: "Data Deleted",
      description: "Exam data has been deleted successfully.",
      variant: "destructive",
    });
  };

  const resetForm = () => {
    setFormData({ examDate: '', timetable: '', driveLink: '', generalQuery: '' });
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dynamic Data Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage exam schedules, timetables, and general information.
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
              Add New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Exam Data' : 'Add New Exam Data'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="examDate">Exam Date</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timetable">Timetable Name</Label>
                <Input
                  id="timetable"
                  placeholder="e.g., Mid-Term Schedule.pdf"
                  value={formData.timetable}
                  onChange={(e) => setFormData({ ...formData, timetable: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="driveLink">Drive Link</Label>
                <Input
                  id="driveLink"
                  placeholder="https://drive.google.com/..."
                  value={formData.driveLink}
                  onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="generalQuery">General Query</Label>
                <Input
                  id="generalQuery"
                  placeholder="Contact information or general notes"
                  value={formData.generalQuery}
                  onChange={(e) => setFormData({ ...formData, generalQuery: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={editingItem ? handleUpdate : handleAdd}
                disabled={!formData.examDate || !formData.timetable}
              >
                {editingItem ? 'Update' : 'Add'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Exam Data</CardTitle>
          <CardDescription>
            Manage exam schedules, timetables, and related information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Date</TableHead>
                <TableHead>Timetable</TableHead>
                <TableHead>Drive Link</TableHead>
                <TableHead>General Query</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {new Date(item.examDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-muted-foreground" />
                      {item.timetable}
                    </div>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={item.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View File
                    </a>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.generalQuery}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicData;