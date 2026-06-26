import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { LogOut, Settings as SettingsIcon } from "lucide-react";

export function SettingsPage() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Organization Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and system configurations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-muted-foreground" />
              General
            </CardTitle>
            <CardDescription>System configurations (Coming Soon)</CardDescription>
          </CardHeader>
          <CardContent className="h-24 flex items-center justify-center text-muted-foreground bg-muted/20 border-y border-dashed">
            Under Development
          </CardContent>
          <CardFooter className="pt-6">
            <Button variant="outline" className="w-full" disabled>Configure</Button>
          </CardFooter>
        </Card>

        <Card className="border-destructive/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-destructive">Account Actions</CardTitle>
            <CardDescription>Log out of your current session.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm"><strong>Logged in as:</strong> {user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
