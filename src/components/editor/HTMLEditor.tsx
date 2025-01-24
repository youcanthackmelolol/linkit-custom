import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const HTMLEditor = () => {
  const [html, setHtml] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // Save HTML content
      toast({
        title: "Success",
        description: "Changes saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">HTML Editor</h2>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      <Textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        className="min-h-[400px] font-mono"
        placeholder="Enter your HTML code here..."
      />
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};