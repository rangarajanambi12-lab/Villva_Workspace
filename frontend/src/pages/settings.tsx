import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useTheme } from "@/components/layout/theme-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/api";

export function SettingsPage() {
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    mobile: (user as any)?.mobile || "",
    profilePicture: (user as any)?.profilePicture || ""
  });
  
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [preferences, setPreferences] = useState({
    theme: "system",
    sidebarMode: "auto",
    dashboardPref: ""
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Fetch preferences on load
    const fetchPref = async () => {
      try {
        const res = await api.get('/users/preferences');
        if (res.data) {
          setPreferences({
            theme: res.data.theme || "system",
            sidebarMode: res.data.sidebarMode || "auto",
            dashboardPref: res.data.dashboardPref || ""
          });
          if (res.data.theme !== "system") {
             setTheme(res.data.theme as any);
          }
        }
      } catch (err) {
        console.error("Failed to fetch preferences", err);
      }
    };
    fetchPref();
  }, [setTheme]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', profileData);
      setMessage({ type: "success", text: "Profile updated successfully. Refresh to see changes." });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update profile." });
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (passwords.newPassword.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters." });
      return;
    }
    try {
      await api.post('/auth/change-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setMessage({ type: "success", text: "Password updated successfully." });
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to update password." });
    }
  };

  const handlePreferencesUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/users/preferences', preferences);
      if (preferences.theme !== "system") {
         setTheme(preferences.theme as any);
      }
      setMessage({ type: "success", text: "Preferences updated successfully." });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update preferences." });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md ${message.type === 'error' ? 'bg-destructive/15 text-destructive' : 'bg-green-500/15 text-green-600 dark:text-green-400'}`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <form onSubmit={handleProfileUpdate}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email (Read-only)</Label>
                  <Input value={user?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Role (Read-only)</Label>
                  <Input value={user?.role || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input 
                    value={profileData.name} 
                    onChange={e => setProfileData({...profileData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mobile Number</Label>
                  <Input 
                    value={profileData.mobile} 
                    onChange={e => setProfileData({...profileData, mobile: e.target.value})} 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    {profileData.profilePicture && (
                       <img src={profileData.profilePicture} alt="Profile" className="h-16 w-16 rounded-full object-cover border" />
                    )}
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append('profilePicture', file);
                        try {
                          const res = await api.post('/users/profile-picture', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                          });
                          setProfileData(prev => ({ ...prev, profilePicture: res.data.url }));
                          setMessage({ type: "success", text: "Profile picture uploaded successfully." });
                        } catch (err) {
                          setMessage({ type: "error", text: "Failed to upload profile picture." });
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Select an image to upload directly to MinIO storage.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Profile</Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Settings</CardTitle>
            <CardDescription>Change your current password.</CardDescription>
          </CardHeader>
          <form onSubmit={handlePasswordUpdate}>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-w-sm">
                <Label>Current Password</Label>
                <Input 
                  type="password" 
                  value={passwords.currentPassword} 
                  onChange={e => setPasswords({...passwords, currentPassword: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2 max-w-sm">
                <Label>New Password</Label>
                <Input 
                  type="password" 
                  value={passwords.newPassword} 
                  onChange={e => setPasswords({...passwords, newPassword: e.target.value})} 
                  required 
                  minLength={8}
                />
              </div>
              <div className="space-y-2 max-w-sm">
                <Label>Confirm New Password</Label>
                <Input 
                  type="password" 
                  value={passwords.confirmPassword} 
                  onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})} 
                  required 
                  minLength={8}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Update Password</Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personalization</CardTitle>
            <CardDescription>Customize your workspace experience.</CardDescription>
          </CardHeader>
          <form onSubmit={handlePreferencesUpdate}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select 
                    value={preferences.theme} 
                    onValueChange={(val) => setPreferences({...preferences, theme: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sidebar Mode</Label>
                  <Select 
                    value={preferences.sidebarMode} 
                    onValueChange={(val) => setPreferences({...preferences, sidebarMode: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sidebar mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Collapse</SelectItem>
                      <SelectItem value="expanded">Always Expanded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Preferences</Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Actions that affect your session.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="destructive" onClick={logout}>
               Log out of all devices
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
