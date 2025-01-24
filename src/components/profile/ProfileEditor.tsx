import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  TwitchIcon,
  Discord,
  Music,
} from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export const ProfileEditor = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string>("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "Instagram", url: "", icon: <Instagram className="h-5 w-5" /> },
    { platform: "Twitter", url: "", icon: <Twitter className="h-5 w-5" /> },
    { platform: "Facebook", url: "", icon: <Facebook className="h-5 w-5" /> },
    { platform: "YouTube", url: "", icon: <Youtube className="h-5 w-5" /> },
    { platform: "Twitch", url: "", icon: <TwitchIcon className="h-5 w-5" /> },
    { platform: "Discord", url: "", icon: <Discord className="h-5 w-5" /> },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLinkChange = (index: number, url: string) => {
    const newLinks = [...socialLinks];
    newLinks[index] = { ...newLinks[index], url };
    setSocialLinks(newLinks);
  };

  const handleSave = async () => {
    try {
      // TODO: Save profile data to Supabase
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profileImage} />
          <AvatarFallback>
            {username.slice(0, 2).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <Label htmlFor="profile-image">Profile Picture</Label>
          <Input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
          />
        </div>

        <div className="space-y-4">
          <Label>Social Links</Label>
          {socialLinks.map((link, index) => (
            <div key={link.platform} className="flex items-center gap-2">
              {link.icon}
              <Input
                value={link.url}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                placeholder={`Your ${link.platform} URL`}
              />
            </div>
          ))}
        </div>

        <div>
          <Label htmlFor="music">Music URL</Label>
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            <Input
              id="music"
              type="url"
              placeholder="Add a music URL (Spotify, SoundCloud, etc.)"
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Profile
        </Button>
      </div>
    </div>
  );
};