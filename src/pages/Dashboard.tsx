import { HTMLEditor } from "@/components/editor/HTMLEditor";
import { AnimatedTransition } from "@/components/common/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AnimatedTransition>
      <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => navigate("/profile")}>
                View Profile
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")}>
                Logout
              </Button>
            </div>
          </div>
          <HTMLEditor />
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;