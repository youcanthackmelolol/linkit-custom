import { AuthForm } from "@/components/auth/AuthForm";
import { AnimatedTransition } from "@/components/common/AnimatedTransition";

const Landing = () => {
  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Create Your Bio Link</h1>
          <p className="text-lg text-gray-600">
            One link to share all your important content
          </p>
        </div>
        <AuthForm />
      </div>
    </AnimatedTransition>
  );
};

export default Landing;