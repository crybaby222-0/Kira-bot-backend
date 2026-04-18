import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Bot,
  Settings2,
  BarChart3,
  CreditCard,
  LifeBuoy,
  ShieldCheck,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard, end: true },
  { title: "Bot WhatsApp", url: "/app/bot", icon: Bot },
  { title: "Configurações", url: "/app/configuracoes", icon: Settings2 },
  { title: "Estatísticas", url: "/app/estatisticas", icon: BarChart3 },
  { title: "Assinatura", url: "/app/assinatura", icon: CreditCard },
  { title: "Suporte", url: "/app/suporte", icon: LifeBuoy },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  const isActive = (url: string, end?: boolean) =>
    end ? location.pathname === url : location.pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/app" className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">Kira Bot</span>
              <span className="text-[10px] text-muted-foreground">Dashboard</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.url, item.end);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className={
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : ""
                      }
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.startsWith("/admin")}
                    tooltip="Painel Admin"
                  >
                    <Link to="/admin">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Painel Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && user && (
          <div className="px-2 py-2">
            <p className="text-xs font-medium truncate">{user.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="justify-start gap-2 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sair</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
