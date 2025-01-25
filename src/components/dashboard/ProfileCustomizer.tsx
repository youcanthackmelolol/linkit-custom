import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music, Image, Upload, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const ProfileCustomizer = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProfile();
    setupRealtimeUpdates();
  }, []);

  const setupRealtimeUpdates = () => {
    const channel = supabase
      .channel('profile_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          if (payload.new.id === profile.id) {
            setProfile(payload.new as Profile);
            queryClient.invalidateQueries({ queryKey: ['profile', payload.new.username] });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      setProfile(data);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "background") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${type}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(fileName);

      const updates = type === 'avatar' 
        ? { avatar_url: publicUrl }
        : { background_url: publicUrl };

      setProfile(prev => ({ ...prev, ...updates }));

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: `${type === 'avatar' ? 'Profile' : 'Background'} picture updated`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      // Invalidate the profile query to update the UI
      queryClient.invalidateQueries({ queryKey: ['profile', profile.username] });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-800/30 border-gray-700">
          <Label className="text-lg font-semibold mb-4 block">Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>
                <User className="h-12 w-12 text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "avatar")}
                className="bg-gray-700"
                disabled={isLoading}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/30 border-gray-700">
          <Label className="text-lg font-semibold mb-4 block">Background Image</Label>
          <div className="flex items-center gap-4">
            {profile.background_url ? (
              <img src={profile.background_url} alt="Background" className="h-24 w-32 object-cover rounded" />
            ) : (
              <div className="h-24 w-32 bg-gray-700 rounded flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "background")}
                className="bg-gray-700"
                disabled={isLoading}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gray-800/30 border-gray-700">
        <Label className="text-lg font-semibold mb-4 block">Description</Label>
        <Textarea
          value={profile.description || ""}
          onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Tell visitors about yourself..."
          className="bg-gray-700 min-h-[100px]"
          disabled={isLoading}
        />
      </Card>

      <Card className="p-6 bg-gray-800/30 border-gray-700">
        <Label className="text-lg font-semibold mb-4 block">Background Music</Label>
        <div className="flex items-center gap-4">
          <Music className="h-6 w-6 text-gray-400" />
          <Input
            type="url"
            value={profile.music_url || ""}
            onChange={(e) => setProfile(prev => ({ ...prev, music_url: e.target.value }))}
            placeholder="Add a music URL (Spotify, SoundCloud, etc.)"
            className="bg-gray-700"
            disabled={isLoading}
          />
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};