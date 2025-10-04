import { createContext, useContext, useState, ReactNode } from "react";
import { v1 as uuidv1 } from "uuid";

interface TaskContextType {
  tasks: {
    id: string;
    name: string;
    keyfield: string[];
    status: string;
    timestamp: string;
  }[];
  setTasks: () => [];
  del: (id) => void;
  create: (
    id: string,
    name: string,
    keyfield: string[],
    status: string,
    timestamp: string
  ) => void;
  update: (
    id: string,
    name: string,
    keyfield: string[],
    status: string,
    timestamp: string
  ) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState([
    {
      id: "33",
      name: "Engineering Team Q1",
      keyfield: ["react", "java"],
      status: "Completed",
      timestamp: "2024-03-15 14:30",
    },
    // {
    //   id: "33",
    //   name: "Sales Department Review",
    //   keyfield: ["react", "java"],
    //   status: "Completed",
    //   timestamp: "2024-03-10 09:15",
    // },
    // {
    //   id: "3",
    //   name: "Marketing Candidates",
    //   keyfield: ["react", "java"],
    //   status: "Completed",
    //   timestamp: "2024-03-05 16:45",
    // },
  ]);

  const del = (id: string) => {
    const data = tasks.filter(({ id }) => id !== id);
    setTasks(data);
  };

  const update = async (
    id: string,
    name: string,
    keyfield: string[],
    status: string,
    timestamp: string
  ) => {
    setTasks([
      ...tasks,
      {
        id: uuidv1(),
        name: "dd",
        keyfield: ["rabindra ", "fgfgf"],
        status: "completed",
        timestamp: "jdfkd",
      },
    ]);
  };

  const create = async (
    id: string,
    name: string,
    keyfield: string[],
    status: string,
    timestamp: string
  ) => {
    setTasks([
      ...tasks,
      {
        id: uuidv1(),
        name: name,
        keyfield: keyfield,
        status: status,
        timestamp: timestamp,
      },
    ]);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, del, create, update }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
