import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Users, CreditCard, Bot, Activity } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const data = Array.from({ length: 7 }, (_, i) => ({
  day: `D${i + 1}`,
  signups: Math.round(5 + Math.random() * 20),
  revenue: Math.round(200 + Math.random() * 600),
}));

function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Visão geral</h1>
        <p className="text-sm text-muted-foreground">Métricas e saúde da plataforma.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={Users} label="Usuários" value="1.284" delta="+24 esta semana" />
        <Stat icon={Bot} label="Bots ativos" value="892" delta="+12 hoje" />
        <Stat icon={CreditCard} label="MRR" value="R$ 18.430" delta="+R$ 1.240" />
        <Stat icon={Activity} label="Uptime" value="99,98%" delta="últimos 30d" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="font-semibold">Novos cadastros (7 dias)</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
                <XAxis dataKey="day" stroke="currentColor" fontSize={11} opacity={0.6} />
                <YAxis stroke="currentColor" fontSize={11} opacity={0.6} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="signups" fill="oklch(0.72 0.19 38)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold">Receita (7 dias) — R$</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
                <XAxis dataKey="day" stroke="currentColor" fontSize={11} opacity={0.6} />
                <YAxis stroke="currentColor" fontSize={11} opacity={0.6} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="revenue" fill="oklch(0.7 0.17 145)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{delta}</p>
    </Card>
  );
}
