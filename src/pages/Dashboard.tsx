import { AnimatedTransition } from "@/components/common/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCustomizer } from "@/components/dashboard/ProfileCustomizer";
import { AppearanceCustomizer } from "@/components/dashboard/AppearanceCustomizer";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AnimatedTransition>
      <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
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

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <ProfileCustomizer />
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <AppearanceCustomizer />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;