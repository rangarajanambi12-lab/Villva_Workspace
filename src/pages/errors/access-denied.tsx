import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AccessDeniedPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <div className="bg-destructive/10 p-4 rounded-full mb-6">
        <ShieldAlert className="w-16 h-16 text-destructive" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">403 Access Denied</h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        You do not have the required permissions to view this module. If you believe this is an error, please contact your administrator.
      </p>
      <Button onClick={() => navigate("/")} size="lg">Return to Dashboard</Button>
    </div>
  );
}
