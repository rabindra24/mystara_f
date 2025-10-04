import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";

const steps = [
  "Uploading files",
  "Parsing resumes",
  "Extracting skills",
  "Analyzing 6-month performance",
  "Generating scores",
];

const Processing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => navigate('/results/1'), 1000);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Processing Resumes</h2>
          <p className="text-muted-foreground">This may take a few moments...</p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                index <= currentStep
                  ? "bg-card border-primary"
                  : "bg-muted/30 border-border"
              }`}
            >
              <div className="flex-shrink-0">
                {index < currentStep ? (
                  <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                ) : index === currentStep ? (
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-border" />
                )}
              </div>
              <span
                className={`font-medium ${
                  index <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Processing;
