import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — Kira Bot" }] }),
  component: ConfigPage,
});

function ConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Configurações avançadas
        </h1>
        <p className="text-sm text-muted-foreground">
          Filtros, logs e comportamento do seu bot.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold">Filtros de palavras</h3>
        <p className="text-xs text-muted-foreground">
          Bloqueia mensagens contendo palavras na lista. Separe por vírgula.
        </p>
        <Textarea
          className="mt-3"
          rows={3}
          placeholder="palavra1, palavra2, palavra3"
          defaultValue="spam, golpe, fraude"
        />
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold">Comportamento</h3>
        <div className="mt-4 space-y-4">
          {[
            { k: "Logs de mensagens", d: "Salva histórico de mensagens recebidas" },
            { k: "Anti-flood", d: "Bloqueia usuários que enviam muitas mensagens" },
            { k: "Notificações", d: "Receba alertas quando o bot ficar offline" },
            { k: "Modo manutenção", d: "Pausa todas as respostas automáticas" },
          ].map((it) => (
            <div key={it.k} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{it.k}</p>
                <p className="text-xs text-muted-foreground">{it.d}</p>
              </div>
              <Switch defaultChecked={it.k !== "Modo manutenção"} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold">Webhooks</h3>
        <p className="text-xs text-muted-foreground">
          Receba eventos do bot em uma URL externa.
        </p>
        <div className="mt-4 space-y-2">
          <Label htmlFor="hook">URL do webhook</Label>
          <Input id="hook" placeholder="https://meusite.com/webhook" />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          className="bg-gradient-primary shadow-elegant"
          onClick={() => toast.success("Configurações salvas")}
        >
          Salvar tudo
        </Button>
      </div>
    </div>
  );
}
