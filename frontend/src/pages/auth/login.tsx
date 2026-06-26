import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import loginVideo from "@/assets/VILLVA_WORKSPACE_Powered_by_Vi.mp4";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { login, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow down the video by half
    }
  }, []);

  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        const userState = useAuthStore.getState().user;
        if (userState?.role === 'SALES_ENGINEER') {
          navigate('/sales');
        } else if (userState?.role === 'APPLICATION_ENGINEER') {
          navigate('/app-engineer');
        } else if (userState?.role === 'PLANT_ENGINEER') {
          navigate('/plant');
        } else {
          navigate('/');
        }
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred during login.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8 lg:p-16 bg-[#133A1B] text-white">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-white">Welcome to Villva</h1>
            <p className="text-base text-white/80">
              Workforce Visibility Platform
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-100 border border-red-500/30">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">Work Email or Username</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-0 text-black h-12 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-0 text-black h-12 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white h-12 text-base font-semibold rounded-md shadow-none" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Accessing...
                </>
              ) : (
                "Access Workspace"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side: Video */}
      <div className="relative hidden w-1/2 lg:block bg-black overflow-hidden border-l border-white/10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={loginVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </div>
  );
}
