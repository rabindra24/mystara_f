import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Search, Mail, Calendar, Eye } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

const performanceData = [
  { name: "Excellent", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Good", value: 40, color: "hsl(var(--chart-1))" },
  { name: "Average", value: 20, color: "hsl(var(--chart-4))" },
  { name: "Below Average", value: 5, color: "hsl(var(--chart-5))" },
];

const skillsData = [
  { skill: "JavaScript", count: 45 },
  { skill: "Python", count: 38 },
  { skill: "React", count: 35 },
  { skill: "Node.js", count: 30 },
  { skill: "SQL", count: 28 },
];

const activityData = [
  { month: "Oct", activity: 65 },
  { month: "Nov", activity: 72 },
  { month: "Dec", activity: 68 },
  { month: "Jan", activity: 80 },
  { month: "Feb", activity: 85 },
  { month: "Mar", activity: 90 },
];

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: string;
  skills: string;
  activity: number;
  score: number;
  notes: string;
  education: string;
  certifications: string;
  projects: string;
  languages: string;
}

const employeeData: Employee[] = [
  { 
    id: 1,
    name: "John Smith", 
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    experience: "5 years", 
    skills: "React, Node.js, TypeScript", 
    activity: 92, 
    score: 95, 
    notes: "Excellent performer",
    education: "BS Computer Science, MIT",
    certifications: "AWS Certified Developer, React Professional",
    projects: "E-commerce Platform, Mobile App Redesign",
    languages: "English, Spanish"
  },
  { 
    id: 2,
    name: "Sarah Johnson", 
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    experience: "3 years", 
    skills: "Python, Django, PostgreSQL", 
    activity: 88, 
    score: 90, 
    notes: "Strong technical skills",
    education: "MS Software Engineering, Stanford",
    certifications: "Python Professional, Django Expert",
    projects: "Data Analytics Dashboard, API Integration",
    languages: "English, French"
  },
  { 
    id: 3,
    name: "Michael Chen", 
    email: "michael.chen@company.com",
    phone: "+1 (555) 345-6789",
    experience: "7 years", 
    skills: "Java, Spring, AWS", 
    activity: 85, 
    score: 88, 
    notes: "Leadership potential",
    education: "BS Computer Engineering, UC Berkeley",
    certifications: "AWS Solutions Architect, Java Master",
    projects: "Microservices Architecture, Cloud Migration",
    languages: "English, Mandarin"
  },
  { 
    id: 4,
    name: "Emily Davis", 
    email: "emily.davis@company.com",
    phone: "+1 (555) 456-7890",
    experience: "4 years", 
    skills: "React, Vue, CSS", 
    activity: 78, 
    score: 82, 
    notes: "Good team player",
    education: "BS Web Development, NYU",
    certifications: "Frontend Developer, UX Design",
    projects: "Marketing Website, Component Library",
    languages: "English"
  },
  { 
    id: 5,
    name: "David Wilson", 
    email: "david.wilson@company.com",
    phone: "+1 (555) 567-8901",
    experience: "2 years", 
    skills: "JavaScript, HTML, CSS", 
    activity: 70, 
    score: 75, 
    notes: "Needs mentoring",
    education: "BS Information Technology, State University",
    certifications: "Web Developer Bootcamp",
    projects: "Company Blog, Landing Pages",
    languages: "English"
  },
];

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(employeeData.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, id]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(empId => empId !== id));
    }
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDetailsOpen(true);
  };

  const handleSendMail = () => {
    if (selectedEmployees.length === 0) {
      toast({
        title: "No employees selected",
        description: "Please select at least one employee to send mail.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Email prepared",
      description: `Preparing to send email to ${selectedEmployees.length} employee(s)`,
    });
  };

  const handleScheduleMeeting = () => {
    if (selectedEmployees.length === 0) {
      toast({
        title: "No employees selected",
        description: "Please select at least one employee to schedule a meeting.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Meeting scheduled",
      description: `Meeting invitation sent to ${selectedEmployees.length} employee(s)`,
    });
  };

  const allSelected = selectedEmployees.length === employeeData.length;
  const someSelected = selectedEmployees.length > 0 && selectedEmployees.length < employeeData.length;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
            <p className="text-muted-foreground">Engineering Team Q1</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Performance Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Skills</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="skill" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">6-Month Activity Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search employees..." className="pl-10" />
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleSendMail}
                  disabled={selectedEmployees.length === 0}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Mail
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleScheduleMeeting}
                  disabled={selectedEmployees.length === 0}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
              {selectedEmployees.length > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  {selectedEmployees.length} employee(s) selected
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <Checkbox 
                        checked={allSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all employees"
                        className={someSelected ? "data-[state=checked]:bg-primary" : ""}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Skills Extracted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last 6mo Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Performance Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {employeeData.map((employee) => (
                    <tr key={employee.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <Checkbox 
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={(checked) => handleSelectEmployee(employee.id, checked as boolean)}
                          aria-label={`Select ${employee.name}`}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{employee.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{employee.experience}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{employee.skills}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                            <div 
                              className="bg-accent h-2 rounded-full" 
                              style={{ width: `${employee.activity}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{employee.activity}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {employee.score}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{employee.notes}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(employee)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                  <p className="text-base font-semibold">{selectedEmployee.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                  <p className="text-base">{selectedEmployee.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                  <p className="text-base">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Experience</h3>
                  <p className="text-base">{selectedEmployee.experience}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Education</h3>
                <p className="text-base">{selectedEmployee.education}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEmployee.skills.split(", ").map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Certifications</h3>
                <p className="text-base">{selectedEmployee.certifications}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Notable Projects</h3>
                <p className="text-base">{selectedEmployee.projects}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Languages</h3>
                <p className="text-base">{selectedEmployee.languages}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">6-Month Activity</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-3">
                      <div 
                        className="bg-accent h-3 rounded-full" 
                        style={{ width: `${selectedEmployee.activity}%` }}
                      />
                    </div>
                    <span className="text-lg font-semibold">{selectedEmployee.activity}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Performance Score</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-accent">{selectedEmployee.score}</span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                <p className="text-base">{selectedEmployee.notes}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={handleSendMail}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button className="flex-1" variant="outline" onClick={handleScheduleMeeting}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Results;
