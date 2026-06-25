import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  FileBarChart,
  Settings,
  Briefcase,
  Factory,
  Contact2,
  Clock,
  BarChart3,
  LogOut
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function SidebarItem({ icon: Icon, title, href, isActive }: { icon: any, title: string, href: string, isActive: boolean }) {
  const linkContent = (
    <Link
      to={href}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted hover:text-primary overflow-hidden",
        isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {title}
      </span>
    </Link>
  );

  return (
    <div className="w-full">
      <Tooltip delayDuration={0}>
        <TooltipTrigger render={linkContent} />
        <TooltipContent side="right" className="group-hover:hidden hidden sm:block">
          {title}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const { sidebarOpen } = useUIStore();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  if (!user) return null;

  const { data: modulesData } = useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      const res = await api.get('/me/modules');
      return res.data;
    },
    enabled: !!user
  });

  const modules = modulesData?.modules || [];
  
  // Update: Only MD, ADMIN, MANAGER see global dashboard and directory
  const isGlobalAllowed = ['ADMIN', 'MD', 'MANAGER'].includes(user.role);
  const isSalesAllowed = ['ADMIN', 'MD', 'MANAGER', 'SALES_ENGINEER'].includes(user.role);
  const isAppEngAllowed = ['ADMIN', 'MD', 'MANAGER', 'APPLICATION_ENGINEER'].includes(user.role);
  const isPlantAllowed = ['ADMIN', 'MD', 'MANAGER', 'PLANT_ENGINEER'].includes(user.role);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <TooltipProvider>
      <div className={cn(
        "group flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 z-40 relative h-screen",
        isMobile ? "w-full sm:hidden [&_.group-hover\\:opacity-100]:opacity-100 [&_.group-hover\\:hidden]:hidden" : "hidden sm:flex w-[70px] hover:w-[260px]"
      )}>
        <div className="flex h-14 items-center border-b px-4">
          <div className="flex items-center gap-2 font-semibold overflow-hidden">
            <img src="https://villva.netlify.app/logo-Photoroom.png" alt="Villva Logo" className="h-8 w-auto shrink-0 object-contain" />
            <span className="tracking-tight text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Villva Workspace
            </span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-4 space-y-4">
          {/* GLOBAL NAV */}
          {isGlobalAllowed && (
            <div className="px-3">
              <div className="space-y-1">
                <SidebarItem icon={LayoutDashboard} title="Global Dashboard" href="/" isActive={location.pathname === "/"} />
                <SidebarItem icon={Contact2} title="Employee Directory" href="/directory" isActive={location.pathname === "/directory"} />
              </div>
            </div>
          )}

          {/* SALES WORKSPACE */}
          {isSalesAllowed && (
            <div className="px-3">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Sales Workspace
              </h2>
              <div className="space-y-1">
                <SidebarItem icon={LayoutDashboard} title="Sales Dashboard" href="/sales" isActive={location.pathname === '/sales'} />
                <SidebarItem icon={Users} title="Customer Master" href="/sales/customers" isActive={location.pathname.startsWith('/sales/customers')} />
                <SidebarItem icon={CalendarDays} title="Weekly CAM" href="/sales/weekly-cam" isActive={location.pathname.startsWith('/sales/weekly-cam')} />
                <SidebarItem icon={FileText} title="Reports" href="/sales/reports" isActive={location.pathname.startsWith('/sales/reports')} />
                <SidebarItem icon={FileBarChart} title="Monthly CAM" href="/sales/monthly-cam" isActive={location.pathname.startsWith('/sales/monthly-cam')} />
              </div>
            </div>
          )}

          {/* APP ENGINEERING WORKSPACE */}
          {isAppEngAllowed && (
            <div className="px-3">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                App Engineering
              </h2>
              <div className="space-y-1">
                <SidebarItem icon={LayoutDashboard} title="App Dashboard" href="/app-engineer" isActive={location.pathname === '/app-engineer'} />
                <SidebarItem icon={Clock} title="Pending Enquiry" href="/app-engineer/pending-enquiry" isActive={location.pathname.startsWith('/app-engineer/pending-enquiry')} />
                <SidebarItem icon={Briefcase} title="General Work" href="/app-engineer/general-work" isActive={location.pathname.startsWith('/app-engineer/general-work')} />
                <SidebarItem icon={FileText} title="Quotations" href="/app-engineer/quotations" isActive={location.pathname.startsWith('/app-engineer/quotations')} />
                <SidebarItem icon={BarChart3} title="Reports" href="/app-engineer/reports" isActive={location.pathname.startsWith('/app-engineer/reports')} />
              </div>
            </div>
          )}

          {/* PLANT WORKSPACE */}
          {isPlantAllowed && (
            <div className="px-3">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Factory / Plant
              </h2>
              <div className="space-y-1">
                <SidebarItem icon={LayoutDashboard} title="Plant Dashboard" href="/plant" isActive={location.pathname === '/plant'} />
                <SidebarItem icon={Factory} title="Team Tracking" href="/plant/tracking" isActive={location.pathname.startsWith('/plant/tracking')} />
                <SidebarItem icon={Briefcase} title="My WAM" href="/plant/wam" isActive={location.pathname.startsWith('/plant/wam')} />
                <SidebarItem icon={FileText} title="Reports" href="/plant/reports" isActive={location.pathname.startsWith('/plant/reports')} />
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-auto border-t p-3 space-y-1">
          <SidebarItem icon={Settings} title="Settings" href="/settings" isActive={location.pathname === '/settings'} />
          <div className="w-full">
            <Tooltip delayDuration={0}>
              <TooltipTrigger render={
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 overflow-hidden"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Logout
                  </span>
                </button>
              } />
              <TooltipContent side="right" className="group-hover:hidden hidden sm:block">
                Logout
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* User Footer */}
        <div className="border-t p-4 flex items-center gap-3 overflow-hidden shrink-0">
          <Avatar className="h-10 w-10 shrink-0 border">
            {/* Ignore ts error for profilePicture for now until we add it to the user store type */}
            {/* @ts-ignore */}
            {user.profilePicture && <AvatarImage src={user.profilePicture} alt={user.name} />}
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <span className="text-sm font-medium leading-tight">{user.name}</span>
            <span className="text-xs text-muted-foreground leading-tight">{user.role}</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
