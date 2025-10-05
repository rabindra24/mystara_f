import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useTask } from "@/contexts/TaskContext";

import { v1 as uuidv1 } from "uuid";
import { createItem, getAllItems } from "@/api/task";

const TaskWorkspace = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { create } = useTask();
  // id: string, name: string, keyfield: string[], status: string, timestamp: string)

  const [name, setName] = useState("New Analysis Task");
  const [keyfields, setKeyFields] = useState([]);
  const [status, setStatus] = useState("active");
  const [timestamp, setTimestamp] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleProcess = async () => {
    // if (files.length > 0) {
    //   navigate('/processing');
    // }
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("keyfield", JSON.stringify(keyfields));
    formData.append("status", status);
    files.forEach((file) => {
      formData.append("files", file); // 'files' is the field name the backend expects
    });

    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload-multiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Sucessfully Uploaded",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
      handleAdd();

      console.log("Upload successful:", response.data);
      // if (files.length > 0) {
      navigate("/processing");
      // }
    } catch (error) {
      toast({
        title: "Sucessfully Uploaded",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
      handleAdd();

      if (files.length > 0) {
        navigate("/processing");
      }
      console.error("Error uploading files:", error);
    }
  };

  const handleKeyfields = (e: string) => {
    const data = e.split(",");
    setKeyFields(data);
  };

  async function handleAdd() {
    if (!name) return;
    await createItem({ name: name, keyfield: keyfields, status: status });
    setName("");
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <Label htmlFor="taskName" className="text-lg">
              Task Name
            </Label>
            <Input
              id="taskName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-2xl font-bold mt-2 h-auto py-3"
            />
          </div>
          <div>
            <Label htmlFor="keyfields" className="text-lg">
              Key Fields
            </Label>
            <Input
              id="keyfields"
              value={keyfields}
              onChange={(e) => handleKeyfields(e.target.value)}
              className="text-2xl font-bold mt-2 h-auto py-3"
            />
            <div className="flex flex-row ">
              {keyfields.map((item) => (
                <div className="mr-2 bg-primary text-white mt-2 font-bold  py-2 px-5 rounded-full ">{`${item}`}</div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upload Resumes</h2>

            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors bg-card">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg mb-2">Drag and drop files here</p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <label htmlFor="fileInput">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Browse Files</span>
                </Button>
              </label>
              <input
                id="fileInput"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {files.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium">Selected Files:</p>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm p-2 bg-secondary rounded"
                  >
                    <FileText className="h-4 w-4 text-primary" />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleProcess}
            disabled={files.length === 0}
          >
            Process Resumes
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TaskWorkspace;
