import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedTransition } from "@/components/common/AnimatedTransition";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Music, User } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const UserProfile = () => {
  const { username } = useParams();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
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

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-gray-600">This user does not exist.</p>
        </Card>
      </div>
    );
  }

  return (
    <AnimatedTransition>
      <div 
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: profile.background_url ? `url(${profile.background_url})` : undefined,
          backgroundColor: profile.background_url ? undefined : '#1a1a1a'
        }}
      >
        <div className="min-h-screen backdrop-blur-xl bg-black/50">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 backdrop-blur-xl bg-white/10">
                <div className="flex flex-col items-center space-y-6">
                  <Avatar className="h-32 w-32 ring-4 ring-white">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback>
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>

                  <h1 className="text-4xl font-bold text-white glow">
                    {profile.username}
                  </h1>

                  {profile.description && (
                    <p className="text-lg text-white/90 text-center max-w-2xl">
                      {profile.description}
                    </p>
                  )}

                  {profile.music_url && (
                    <div className="flex items-center space-x-2 text-white/80">
                      <Music className="h-5 w-5" />
                      <a 
                        href={profile.music_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Background Music
                      </a>
                    </div>
                  )}

                  {profile.social_links && (
                    <div className="flex space-x-4">
                      {Object.entries(profile.social_links as Record<string, string>).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          {platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default UserProfile;