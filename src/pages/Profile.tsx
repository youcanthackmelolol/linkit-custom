import { AnimatedTransition } from "@/components/common/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
          <div className="prose max-w-none">
            {/* Profile content will be rendered here */}
            <p>Your profile content will appear here...</p>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Profile;