import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, LifeBuoy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/suporte")({
  head: () => ({ meta: [{ title: "Suporte — Kira Bot" }] }),
  component: SupportPage,
});

const tickets = [
  { id: "T-1294", title: "Bot desconectou sozinho", status: "Aberto", date: "há 2h" },
  { id: "T-1267", title: "Como criar comando custom?", status: "Resolvido", date: "ontem" },
];

const faq = [
  {
    q: "Como conecto o bot ao WhatsApp?",
    a: "Vá em Bot WhatsApp → Conectar → escaneie o QR code com seu WhatsApp em Aparelhos conectados.",
  },
  {
    q: "Posso usar o bot sem assinatura?",
    a: "Não. O Kira Bot só funciona com um plano pago ativo. Não existe plano gratuito.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Senhas são armazenadas com hash bcrypt/argon2, comunicação via HTTPS e tokens JWT seguros.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, sem multa. O acesso permanece até o fim do período já pago.",
  },
];

function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Suporte</h1>
        <p className="text-sm text-muted-foreground">
          Tire dúvidas, abra um ticket ou converse no WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-5">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-semibold">WhatsApp</h3>
          <p className="text-sm text-muted-foreground">Resposta rápida no horário comercial.</p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <a href="https://wa.me/17097013754" target="_blank" rel="noopener noreferrer">
              Abrir conversa
            </a>
          </Button>
        </Card>
        <Card className="p-5">
          <LifeBuoy className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-semibold">Discord</h3>
          <p className="text-sm text-muted-foreground">Comunidade ativa para tirar dúvidas.</p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Entrar no servidor
            </a>
          </Button>
        </Card>
        <Card className="p-5">
          <Plus className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-semibold">Abrir ticket</h3>
          <p className="text-sm text-muted-foreground">Para problemas técnicos detalhados.</p>
          <Button size="sm" className="mt-4 bg-gradient-primary">
            Novo ticket
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <h3 className="font-semibold">Abrir novo ticket</h3>
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Ticket criado! Responderemos em breve.");
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input id="subject" required maxLength={120} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg">Descrição</Label>
              <Textarea id="msg" required rows={5} maxLength={2000} />
            </div>
            <Button type="submit" className="bg-gradient-primary shadow-elegant">
              Enviar
            </Button>
          </form>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Meus tickets</h3>
          <div className="mt-4 space-y-2">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border p-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">{t.id}</span>
                  <Badge
                    variant="outline"
                    className={
                      t.status === "Aberto"
                        ? "border-warning/30 bg-warning/10"
                        : "border-success/30 bg-success/10 text-success"
                    }
                  >
                    {t.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold">Perguntas frequentes</h3>
        <Accordion type="single" collapsible className="mt-2">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-sm">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
