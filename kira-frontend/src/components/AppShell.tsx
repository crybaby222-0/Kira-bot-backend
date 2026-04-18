import type { ReactNode } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/lib/auth-store";
import { Badge } from "@/components/ui/badge";

export function AppShell({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();
  const { user, initialized, init } = useAuth();

  useEffect(() => {
    if (!initialized) init();
  }, [initialized, init]);

  useEffect(() => {
    if (initialized && !user) {
      navigate({ to: "/login" });
    }
  }, [initialized, user, navigate]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md">
            <SidebarTrigger />
            <div className="flex-1" />
            <Badge variant="outline" className="hidden gap-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs">Sistema online</span>
            </Badge>
            <ThemeToggle />
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children ?? <Outlet />}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
