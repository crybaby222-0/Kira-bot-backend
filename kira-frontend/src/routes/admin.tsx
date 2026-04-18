import { createFileRoute, Outlet, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, CreditCard, FileText, LayoutDashboard, LogOut, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Kira Bot" }] }),
  component: AdminLayout,
});

const navItems = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard, end: true },
  { to: "/admin/usuarios", label: "Usuários", icon: Users },
  { to: "/admin/pagamentos", label: "Pagamentos", icon: CreditCard },
  { to: "/admin/logs", label: "Logs", icon: FileText },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, initialized, init, logout } = useAuth();

  useEffect(() => {
    if (!initialized) init();
  }, [initialized, init]);

  useEffect(() => {
    if (initialized && (!user || user.role !== "admin")) {
      navigate({ to: "/login" });
    }
  }, [initialized, user, navigate]);

  if (!initialized || !user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const isActive = (to: string, end?: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive shadow-glow">
            <ShieldCheck className="h-5 w-5 text-destructive-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold">Painel Admin</p>
            <p className="text-[10px] text-muted-foreground">Kira Bot</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive(it.to, it.end)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              }`}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <Link to="/app">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao app
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="mt-1 w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md">
          <Badge variant="outline" className="gap-1.5 border-destructive/40 bg-destructive/10 text-destructive">
            <ShieldCheck className="h-3 w-3" />
            <span className="text-xs">Modo administrador</span>
          </Badge>
          <div className="flex-1" />
          <ThemeToggle />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
