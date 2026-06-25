import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useAuthStore } from "@/stores/auth-store";
import { useUIStore } from "@/stores/ui-store";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppLayout() {
  const { isAuthenticated } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full flex-col bg-muted/40 text-left overflow-hidden">
        <div className="flex flex-1 overflow-hidden h-full">
          {/* Desktop Sidebar container (fixed width) */}
          <div className="hidden sm:block w-[70px] shrink-0 h-full z-40 relative">
            {/* The absolute child expands over content */}
            <div className="absolute top-0 left-0 h-full">
              <Sidebar />
            </div>
          </div>

          {/* Mobile Sidebar (Sheet) */}
          <Sheet open={sidebarOpen} onOpenChange={(open) => {
            if (!open && sidebarOpen) toggleSidebar();
            if (open && !sidebarOpen) toggleSidebar();
          }}>
            <SheetContent side="left" className="p-0 w-[260px] bg-sidebar border-r-0 [&>button]:hidden">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              {/* Force expand on mobile by adding group and overriding hover classes indirectly, actually Sidebar manages its own width, we can pass a prop or just let CSS handle it. Since we added 'group', the mobile view will just be a wide sidebar. */}
              <div className="h-full w-full [&>div]:w-full [&>div]:max-w-[260px]">
                 <Sidebar isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex flex-col flex-1 overflow-hidden relative z-10 w-full h-full">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              <div className="mx-auto w-full max-w-7xl">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
