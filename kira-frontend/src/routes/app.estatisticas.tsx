import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/app/estatisticas")({
  head: () => ({ meta: [{ title: "Estatísticas — Kira Bot" }] }),
  component: StatsPage,
});

const monthly = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
].map((m, i) => ({
  month: m,
  enviadas: 4000 + i * 300 + Math.round(Math.random() * 1000),
  recebidas: 3500 + i * 280 + Math.round(Math.random() * 900),
}));

const cmds = [
  { cmd: "menu", uses: 1280 },
  { cmd: "sticker", uses: 892 },
  { cmd: "rpg", uses: 633 },
  { cmd: "play", uses: 540 },
  { cmd: "ban", uses: 220 },
  { cmd: "menu2", uses: 145 },
];

function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Estatísticas</h1>
        <p className="text-sm text-muted-foreground">
          Visão completa do uso do seu bot.
        </p>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold">Mensagens por mês</h3>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
              <XAxis dataKey="month" stroke="currentColor" fontSize={11} opacity={0.6} />
              <YAxis stroke="currentColor" fontSize={11} opacity={0.6} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="enviadas"
                stroke="oklch(0.72 0.19 38)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="recebidas"
                stroke="oklch(0.7 0.17 145)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="font-semibold">Comandos mais usados</h3>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cmds}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
                <XAxis dataKey="cmd" stroke="currentColor" fontSize={11} opacity={0.6} />
                <YAxis stroke="currentColor" fontSize={11} opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="uses" fill="oklch(0.72 0.19 38)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Resumo</h3>
          <dl className="mt-4 space-y-3">
            {[
              { k: "Total de mensagens", v: "84.392" },
              { k: "Total de comandos", v: "12.847" },
              { k: "Usuários únicos", v: "1.284" },
              { k: "Tempo online (mês)", v: "99,8%" },
              { k: "Uptime médio", v: "29d 22h" },
            ].map((it) => (
              <div
                key={it.k}
                className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0"
              >
                <dt className="text-sm text-muted-foreground">{it.k}</dt>
                <dd className="text-sm font-semibold">{it.v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </div>
  );
}
