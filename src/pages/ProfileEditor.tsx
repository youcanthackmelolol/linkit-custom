import { AnimatedTransition } from "@/components/common/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProfileCustomizer } from "@/components/dashboard/ProfileCustomizer";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const ProfileEditor = () => {
  const navigate = useNavigate();
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
            </div>
          </div>
          
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <ProfileCustomizer />
          </Card>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ProfileEditor;