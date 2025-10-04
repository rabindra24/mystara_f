import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, TrendingUp } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">HireInsight</span>
          </div>
          <Button onClick={() => navigate('/login')} variant="outline">
            Sign In
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Smarter Hiring with
            <span className="text-primary block mt-2">Automated Employee Insights</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload resumes, analyze activity patterns, and get comprehensive performance scores—all in one streamlined platform.
          </p>

          <Button 
            size="lg" 
            className="text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <Users className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Smart Analysis</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered resume parsing and skill extraction
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <TrendingUp className="h-12 w-12 text-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Performance Tracking</h3>
              <p className="text-muted-foreground text-sm">
                6-month activity trends and scoring metrics
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <BarChart3 className="h-12 w-12 text-chart-3 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Visual Insights</h3>
              <p className="text-muted-foreground text-sm">
                Interactive charts and exportable reports
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
