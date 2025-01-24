import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/common/GlassCard";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        // Handle login
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        navigate("/dashboard");
      } else {
        // Handle registration
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <GlassCard className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          {isLogin ? "Login" : "Create Account"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Need an account? Register" : "Already have an account? Login"}
        </Button>
      </form>
    </GlassCard>
  );
};