import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-store";
import {
  Bot,
  MessageSquare,
  Zap,
  Users,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Kira Bot" }] }),
  component: DashboardHome,
});

const activityData = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 1}`,
  msgs: Math.round(800 + Math.random() * 1200 + i * 40),
  cmds: Math.round(120 + Math.random() * 200 + i * 8),
}));

function DashboardHome() {
  const user = useAuth((s) => s.user);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Olá, {user?.name?.split(" ")[0] ?? "Usuário"} 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Aqui está um resumo do seu bot hoje.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 border-success/30 bg-success/10">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs">Bot conectado</span>
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={MessageSquare}
          label="Mensagens hoje"
          value="2.847"
          delta="+12,4%"
          positive
        />
        <StatCard icon={Zap} label="Comandos executados" value="1.293" delta="+8,2%" positive />
        <StatCard icon={Users} label="Chats ativos" value="184" delta="+3,1%" positive />
        <StatCard
          icon={TrendingUp}
          label="Tempo online"
          value="99,8%"
          delta="últimos 30 dias"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Atividade dos últimos 14 dias</h3>
              <p className="text-xs text-muted-foreground">
                Mensagens e comandos por dia
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link to="/app/estatisticas">
                Ver tudo
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="msgs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.72 0.19 38)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.72 0.19 38)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cmds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.7 0.17 145)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.7 0.17 145)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
                <XAxis dataKey="day" stroke="currentColor" fontSize={11} opacity={0.5} />
                <YAxis stroke="currentColor" fontSize={11} opacity={0.5} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="msgs"
                  stroke="oklch(0.72 0.19 38)"
                  fill="url(#msgs)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="cmds"
                  stroke="oklch(0.7 0.17 145)"
                  fill="url(#cmds)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Alerts / quick actions */}
        <Card className="p-5">
          <h3 className="font-semibold">Avisos do sistema</h3>
          <div className="mt-4 space-y-3">
            <Alert
              tone="warning"
              title="Sua assinatura expira em 7 dias"
              desc="Renove para evitar interrupção no serviço do bot."
              action={{ label: "Renovar", to: "/app/assinatura" }}
            />
            <Alert
              tone="info"
              title="Nova versão disponível"
              desc="Comandos de RPG ganharam 5 novos eventos."
            />
            <Alert
              tone="success"
              title="Backup concluído"
              desc="Configurações salvas automaticamente."
            />
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Gerencie seu bot</h3>
              <p className="text-sm text-muted-foreground">
                Conecte ao WhatsApp, configure comandos e respostas automáticas.
              </p>
            </div>
          </div>
          <Button asChild className="bg-gradient-primary shadow-elegant">
            <Link to="/app/bot">
              Abrir bot
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  positive,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      {delta && (
        <p
          className={`mt-1 text-xs ${
            positive ? "text-success" : "text-muted-foreground"
          }`}
        >
          {delta}
        </p>
      )}
    </Card>
  );
}

function Alert({
  tone,
  title,
  desc,
  action,
}: {
  tone: "info" | "warning" | "success";
  title: string;
  desc: string;
  action?: { label: string; to: string };
}) {
  const styles = {
    info: "border-primary/30 bg-primary/5 text-primary",
    warning: "border-warning/30 bg-warning/10 text-warning-foreground",
    success: "border-success/30 bg-success/10 text-success",
  }[tone];

  return (
    <div className={`rounded-lg border p-3 ${styles}`}>
      <div className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
          {action && (
            <Link
              to={action.to}
              className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
            >
              {action.label} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
