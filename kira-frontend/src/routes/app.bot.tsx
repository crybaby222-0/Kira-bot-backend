import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
  Bot,
  Power,
  RotateCw,
  QrCode,
  Smartphone,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";

export const Route = createFileRoute("/app/bot")({
  head: () => ({ meta: [{ title: "Bot WhatsApp — Kira Bot" }] }),
  component: BotPage,
});

type Status = "connected" | "disconnected" | "qr" | "loading";

function BotPage() {
  const [status, setStatus] = useState<Status>("disconnected");
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    setStatus("loading");
    try {
      const res = await api.connectBot();
      setStatus(res.status);
      toast.success("Solicitação de conexão enviada");
    } catch {
      // Demo fallback
      setTimeout(() => {
        setStatus("qr");
        toast.info("Modo demo: QR code simulado exibido");
      }, 800);
    } finally {
      setLoading(false);
    }
  }

  async function handleDisconnect() {
    setLoading(true);
    try {
      await api.disconnectBot();
    } catch {
      /* demo */
    }
    setStatus("disconnected");
    toast.success("Bot desconectado");
    setLoading(false);
  }

  async function handleRestart() {
    setLoading(true);
    try {
      await api.restartBot();
    } catch {
      /* demo */
    }
    toast.success("Reiniciando bot...");
    setTimeout(() => {
      setStatus("connected");
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Bot WhatsApp</h1>
        <p className="text-sm text-muted-foreground">
          Conecte sua sessão e configure comportamento do bot.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Connection card */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Sessão WhatsApp</h3>
                <p className="text-xs text-muted-foreground">
                  {status === "connected"
                    ? "Bot online e respondendo"
                    : status === "qr"
                      ? "Escaneie o QR code para conectar"
                      : status === "loading"
                        ? "Conectando..."
                        : "Bot offline"}
                </p>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>

          <div className="mt-6">
            {status === "qr" && (
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 p-6">
                <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-background shadow-card">
                  <QrCode className="h-32 w-32 text-foreground" />
                </div>
                <p className="text-sm font-medium">Abra o WhatsApp → Aparelhos conectados</p>
                <p className="text-xs text-muted-foreground">
                  Toque em "Conectar um aparelho" e escaneie o QR code acima
                </p>
              </div>
            )}

            {status === "connected" && (
              <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-4">
                <Smartphone className="h-5 w-5 text-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium">+55 11 99999-0000</p>
                  <p className="text-xs text-muted-foreground">
                    Conectado há 2h 14min
                  </p>
                </div>
              </div>
            )}

            {status === "disconnected" && (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <Bot className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">Nenhuma sessão ativa</p>
                <p className="text-xs text-muted-foreground">
                  Clique em "Conectar" para iniciar uma nova sessão.
                </p>
              </div>
            )}

            {status === "loading" && (
              <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {status !== "connected" ? (
              <Button
                onClick={handleConnect}
                disabled={loading}
                className="bg-gradient-primary shadow-elegant"
              >
                <Power className="mr-2 h-4 w-4" />
                Conectar
              </Button>
            ) : (
              <Button onClick={handleDisconnect} disabled={loading} variant="destructive">
                <Power className="mr-2 h-4 w-4" />
                Desconectar
              </Button>
            )}
            <Button onClick={handleRestart} disabled={loading} variant="outline">
              <RotateCw className="mr-2 h-4 w-4" />
              Reiniciar
            </Button>
          </div>
        </Card>

        {/* Quick info */}
        <Card className="p-6">
          <h3 className="font-semibold">Configuração rápida</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prefix">Prefixo de comandos</Label>
              <Input id="prefix" defaultValue="!" maxLength={3} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Apenas grupos permitidos</p>
                <p className="text-xs text-muted-foreground">Ignorar mensagens privadas</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Anti-link</p>
                <p className="text-xs text-muted-foreground">Remove links automáticos</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full">
              Salvar
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="commands">
          <TabsList>
            <TabsTrigger value="commands">Comandos</TabsTrigger>
            <TabsTrigger value="autoreply">Auto-respostas</TabsTrigger>
            <TabsTrigger value="welcome">Boas-vindas</TabsTrigger>
            <TabsTrigger value="permissions">Permissões</TabsTrigger>
          </TabsList>

          <TabsContent value="commands" className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Crie comandos personalizados acionados pelo prefixo.
              </p>
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" />
                Novo comando
              </Button>
            </div>
            <div className="divide-y rounded-lg border">
              {[
                { cmd: "!menu", resp: "Mostra a lista de comandos", uses: 1284 },
                { cmd: "!sticker", resp: "Cria figurinha da imagem", uses: 892 },
                { cmd: "!rpg", resp: "Abre menu de RPG", uses: 433 },
              ].map((c) => (
                <div key={c.cmd} className="flex items-center gap-3 p-3">
                  <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-primary">
                    {c.cmd}
                  </code>
                  <span className="flex-1 text-sm text-muted-foreground">{c.resp}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {c.uses} usos
                  </Badge>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="autoreply" className="mt-4">
            <div className="space-y-2">
              <Label>Mensagem de boas-vindas</Label>
              <Textarea
                placeholder="Olá @user, bem-vindo ao grupo!"
                rows={4}
                defaultValue="Olá @user, seja muito bem-vindo(a) ao grupo!"
              />
              <Button size="sm" className="mt-2">
                Salvar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="welcome" className="mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Ativar boas-vindas</p>
                  <p className="text-xs text-muted-foreground">
                    Envia mensagem quando alguém entra
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Configure quem pode usar comandos restritos do bot.
            </p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map = {
    connected: { label: "Conectado", cls: "border-success/30 bg-success/10 text-success" },
    disconnected: {
      label: "Desconectado",
      cls: "border-destructive/30 bg-destructive/10 text-destructive",
    },
    qr: { label: "Aguardando QR", cls: "border-primary/30 bg-primary/10 text-primary" },
    loading: { label: "Carregando", cls: "border-muted-foreground/30 bg-muted text-muted-foreground" },
  }[status];
  return (
    <Badge variant="outline" className={`gap-1.5 ${map.cls}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "connected" ? "bg-success animate-pulse" : "bg-current"
        }`}
      />
      {map.label}
    </Badge>
  );
}
