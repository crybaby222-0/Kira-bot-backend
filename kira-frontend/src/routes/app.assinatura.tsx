import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";
import { Check, CreditCard, Loader2, Receipt } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/assinatura")({
  head: () => ({ meta: [{ title: "Assinatura — Kira Bot" }] }),
  component: SubscriptionPage,
});

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 19",
    features: ["1 instância de bot", "Comandos ilimitados", "Suporte por e-mail"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 49",
    features: [
      "3 instâncias de bot",
      "Comandos personalizados",
      "Estatísticas avançadas",
      "Suporte prioritário",
    ],
    highlight: true,
  },
  {
    id: "business",
    name: "Business",
    price: "R$ 129",
    features: ["10 instâncias de bot", "API completa", "Logs e auditoria", "Suporte 24/7"],
  },
];

function SubscriptionPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSubscribe(planId: string) {
    setLoading(planId);
    try {
      const { url } = await api.createCheckout(planId);
      window.location.href = url;
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("Não foi possível abrir o checkout. Verifique a conexão com o servidor.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Assinatura</h1>
        <p className="text-sm text-muted-foreground">
          Pagamento processado de forma segura via Stripe.
        </p>
      </div>

      <Card className="border-warning/30 bg-warning/10 p-5">
        <div className="flex items-start gap-3">
          <CreditCard className="mt-0.5 h-5 w-5 text-warning-foreground" />
          <div>
            <p className="font-medium">Nenhuma assinatura ativa</p>
            <p className="text-sm text-muted-foreground">
              É necessário um plano pago para usar o bot. Não há plano gratuito.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <Card
            key={p.id}
            className={`relative flex flex-col p-6 ${
              p.highlight
                ? "border-primary/50 shadow-elegant scale-[1.02]"
                : "border-border/60"
            }`}
          >
            {p.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                Recomendado
              </div>
            )}
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold">{p.price}</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <ul className="mt-4 flex-1 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              className={`mt-6 ${p.highlight ? "bg-gradient-primary shadow-glow" : ""}`}
              variant={p.highlight ? "default" : "outline"}
              disabled={loading === p.id}
              onClick={() => handleSubscribe(p.id)}
            >
              {loading === p.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Abrindo...
                </>
              ) : (
                "Assinar"
              )}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-3">
          <Receipt className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Histórico de pagamentos</h3>
        </div>
        <div className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nenhum pagamento ainda. Seus recibos aparecerão aqui.
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">Seguro</Badge>
          Pagamentos processados pela Stripe. Os dados do cartão nunca passam pelos nossos servidores.
        </div>
      </Card>
    </div>
  );
}
