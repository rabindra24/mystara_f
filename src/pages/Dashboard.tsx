import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, LogOut, BarChart3, Clock } from "lucide-react";
import { useTask } from "@/contexts/TaskContext";
import { getAllItems } from "@/api/task";
import { useEffect, useState } from "react";

const mockTasks = [
  {
    id: 1,
    name: "Engineering Team Q1",
    status: "Completed",
    timestamp: "2024-03-15 14:30",
  },
  {
    id: 2,
    name: "Sales Department Review",
    status: "Completed",
    timestamp: "2024-03-10 09:15",
  },
  {
    id: 3,
    name: "Marketing Candidates",
    status: "Completed",
    timestamp: "2024-03-05 16:45",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { tasks } = useTask();

  const [items, setItems] = useState([...mockTasks]);

  // console.log(tasks);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  async function loadItems() {
    const data = await getAllItems();
    console.log(data)
    setItems(data);
  }

  useEffect(() => {
    loadItems();
  }, []);

  // async function handleAdd() {
  //   if (!newName) return;
  //   await createItem({ name: newName, keyfield: "KEY123", status: "active" });
  //   setNewName("");
  //   loadItems();
  // }

  // async function handleDelete(id) {
  //   await deleteItem(id);
  //   loadItems();
  // }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">HireInsight</span>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your employee analysis tasks
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => navigate("/task/new")}
            className="w-full md:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Task
          </Button>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>
            <div className="space-y-3">
              {items.map((task) => (
                <div
                  key={task.id}
                  onClick={() => navigate(`/results/${task.id}`)}
                  className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {task.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {task.timestamp}
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

// Create a nodejs backend using Express and MongoDB to handle CRUD operations for tasks.// Each task should have fields: id, name, keyfield, status, timestamp.  // Implement API endpoints for creating, reading, updating, and deleting tasks. // Tables : user table, task table it will have name of taks , id , keyfield , status , timestamp , userId (foreign key referencing user table)  it should also have file name which i uploaded using multer and store the file in uploads folder and store the file name in database.  // Implement user authentication with JWT.  // Protect task routes to ensure only authenticated users can access them.  // Use environment variables for configuration (e.g., database connection string, JWT secret).  for mongodb use mongoose schema and model.
// Connect the frontend to the backend API for full functionality.
