import { AnimatedTransition } from "@/components/common/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Pencil, Eye, Music } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <AnimatedTransition>
      <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/${profile?.username}`)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Button>
              <Button 
                onClick={() => navigate("/profile/edit")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Profile Preview</h2>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback>
                    <User className="h-10 w-10 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{profile?.username}</h3>
                  <p className="text-gray-400">{profile?.description || 'No description yet'}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Customizations</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Background Image</span>
                  <span className="text-gray-400">
                    {profile?.background_url ? 'Set' : 'Not set'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Background Music</span>
                  <span className="text-gray-400">
                    {profile?.music_url ? (
                      <div className="flex items-center">
                        <Music className="w-4 h-4 mr-2" />
                        Set
                      </div>
                    ) : 'Not set'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Social Links</span>
                  <span className="text-gray-400">
                    {profile?.social_links ? 'Configured' : 'Not configured'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;