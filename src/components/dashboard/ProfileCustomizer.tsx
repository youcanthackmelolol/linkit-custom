import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music, Image, Upload } from "lucide-react";

export const ProfileCustomizer = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "background") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfileImage(reader.result as string);
        } else {
          setBackgroundImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // TODO: Save to Supabase
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-800/30 border-gray-700">
          <Label className="text-lg font-semibold mb-4 block">Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage} />
              <AvatarFallback>
                <Image className="h-12 w-12 text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "profile")}
                className="bg-gray-700"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/30 border-gray-700">
          <Label className="text-lg font-semibold mb-4 block">Background Image</Label>
          <div className="flex items-center gap-4">
            {backgroundImage ? (
              <img src={backgroundImage} alt="Background" className="h-24 w-32 object-cover rounded" />
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
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gray-800/30 border-gray-700">
        <Label className="text-lg font-semibold mb-4 block">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell visitors about yourself..."
          className="bg-gray-700 min-h-[100px]"
        />
      </Card>

      <Card className="p-6 bg-gray-800/30 border-gray-700">
        <Label className="text-lg font-semibold mb-4 block">Background Music</Label>
        <div className="flex items-center gap-4">
          <Music className="h-6 w-6 text-gray-400" />
          <Input
            type="url"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="Add a music URL (Spotify, SoundCloud, etc.)"
            className="bg-gray-700"
          />
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
};