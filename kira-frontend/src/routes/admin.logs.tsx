import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/logs")({
  component: AdminLogs,
});

const logs = [
  { time: "12:48:21", level: "info", msg: "Bot u1 conectou ao WhatsApp" },
  { time: "12:47:11", level: "warn", msg: "Tentativa de login inválida (ip 187.45.x.x)" },
  { time: "12:46:02", level: "info", msg: "Webhook Stripe: invoice.paid (u3)" },
  { time: "12:45:00", level: "error", msg: "Falha ao enviar e-mail (smtp timeout)" },
  { time: "12:42:39", level: "info", msg: "Novo usuário registrado: maria@ex.com" },
];

function AdminLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Logs do sistema</h1>
        <p className="text-sm text-muted-foreground">Eventos recentes do servidor.</p>
      </div>

      <Card className="p-2">
        <div className="rounded-md bg-muted/30 p-4 font-mono text-xs">
          {logs.map((l, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border-b border-border/30 py-1.5 last:border-0"
            >
              <span className="text-muted-foreground">{l.time}</span>
              <Badge
                variant="outline"
                className={
                  l.level === "error"
                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                    : l.level === "warn"
                      ? "border-warning/30 bg-warning/10"
                      : "border-primary/30 bg-primary/10 text-primary"
                }
              >
                {l.level.toUpperCase()}
              </Badge>
              <span className="flex-1">{l.msg}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
