import { AnimatedTransition } from "@/components/common/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProfileEditor } from "@/components/profile/ProfileEditor";
import { GlassCard } from "@/components/common/GlassCard";

const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
          <GlassCard>
            <ProfileEditor />
          </GlassCard>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Profile;