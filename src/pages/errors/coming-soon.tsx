import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ComingSoonProps {
  moduleName: string;
}

export function ComingSoonPage({ moduleName }: ComingSoonProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <div className="bg-muted p-4 rounded-full mb-6">
        <Wrench className="w-16 h-16 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">{moduleName}</h1>
      <div className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-sm mb-6 uppercase tracking-widest border border-primary/20">
        Coming Soon
      </div>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        This module is currently under development in Phase 2 and is not yet available for access.
      </p>
      <Button onClick={() => navigate("/")} size="lg" variant="outline">Return to Dashboard</Button>
    </div>
  );
}
