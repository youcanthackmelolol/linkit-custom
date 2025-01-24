import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

export const AppearanceCustomizer = () => {
  const { toast } = useToast();
  const [socialsGlow, setSocialsGlow] = useState(false);
  const [usernameGlow, setUsernameGlow] = useState(false);
  const [opacity, setOpacity] = useState([50]);
  const [blur, setBlur] = useState([20]);
  const [accentColor, setAccentColor] = useState("#1b1b1b");
  const [textColor, setTextColor] = useState("#FFFFFF");

  const handleSave = async () => {
    try {
      // TODO: Save to Supabase
      toast({
        title: "Success",
        description: "Appearance settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save appearance settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-800/30 border-gray-700">
          <Label className="text-lg font-semibold mb-4 block">Profile Opacity</Label>
          <Slider
            value={opacity}
            onValueChange={setOpacity}
            max={100}
            step={1}
            className="my-4"
          />
          <div className="text-sm text-gray-400">{opacity}%</div>
        </Card>

        <Card className="p-6 bg-gray-800/30 border-gray-700">
          <Label className="text-lg font-semibold mb-4 block">Profile Blur</Label>
          <Slider
            value={blur}
            onValueChange={setBlur}
            max={80}
            step={1}
            className="my-4"
          />
          <div className="text-sm text-gray-400">{blur}px</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-800/30 border-gray-700">
          <Label className="text-lg font-semibold mb-4 block">Colors</Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Accent Color</span>
              <Input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-20 h-10 bg-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Text Color</span>
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-20 h-10 bg-transparent"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/30 border-gray-700">
          <Label className="text-lg font-semibold mb-4 block">Effects</Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Socials Glow</span>
              <Switch
                checked={socialsGlow}
                onCheckedChange={setSocialsGlow}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Username Glow</span>
              <Switch
                checked={usernameGlow}
                onCheckedChange={setUsernameGlow}
              />
            </div>
          </div>
        </Card>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Appearance
      </Button>
    </div>
  );
};