import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sparkles,
  Bot,
  Shield,
  Zap,
  BarChart3,
  MessageSquare,
  CreditCard,
  Gamepad2,
  Wand2,
  Sticker,
  Check,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kira Bot — Bot de WhatsApp completo" },
      {
        name: "description",
        content:
          "O bot de WhatsApp mais completo: administração, RPG, jogos, figurinhas e muito mais. Gerencie tudo num dashboard moderno.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">Kira Bot</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#recursos" className="hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#planos" className="hover:text-foreground transition-colors">
              Planos
            </a>
            <a href="#sobre" className="hover:text-foreground transition-colors">
              Sobre
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild className="bg-gradient-primary shadow-elegant">
              <Link to="/registro">
                Começar
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Novo: dashboard oficial disponível
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Seu bot do WhatsApp,{" "}
              <span className="text-gradient">poderoso e simples</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Administração de grupos, RPG, jogos, figurinhas e muito mais. Gerencie tudo num
              painel moderno, com estatísticas em tempo real e configuração visual.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild className="bg-gradient-primary shadow-glow">
                <Link to="/registro">
                  Criar minha conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Já tenho conta</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Apenas planos pagos · Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="border-t border-border/40 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Tudo que você precisa
            </h2>
            <p className="mt-3 text-muted-foreground">
              Recursos pensados para grupos ativos e comunidades reais.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Administração",
                desc: "Ferramentas completas para gerenciar grupos: antilink, banimento, boas-vindas e muito mais.",
              },
              {
                icon: Gamepad2,
                title: "Jogos e Diversão",
                desc: "Diversos jogos e brincadeiras para você se divertir com amigos no grupo.",
              },
              {
                icon: Wand2,
                title: "Sistema de RPG",
                desc: "Um sistema completo de RPG direto no WhatsApp, com inventário e batalhas.",
              },
              {
                icon: Sticker,
                title: "Figurinhas",
                desc: "Crie e compartilhe stickers personalizados a partir de imagens, vídeos ou textos.",
              },
              {
                icon: BarChart3,
                title: "Estatísticas em tempo real",
                desc: "Acompanhe mensagens, comandos executados e crescimento da sua comunidade.",
              },
              {
                icon: Zap,
                title: "Comandos personalizados",
                desc: "Crie seus próprios comandos e auto-respostas sem precisar programar.",
              },
            ].map((f) => (
              <Card
                key={f.title}
                className="group relative overflow-hidden border-border/60 bg-card/50 p-6 transition-all hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="border-t border-border/40 bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Planos pagos</h2>
            <p className="mt-3 text-muted-foreground">
              Escolha o plano ideal para o seu uso. Sem versão gratuita.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "R$ 19",
                desc: "Para começar com tudo o essencial.",
                features: ["1 instância de bot", "Comandos ilimitados", "Suporte por e-mail"],
                highlight: false,
              },
              {
                name: "Pro",
                price: "R$ 49",
                desc: "Mais recursos e prioridade no suporte.",
                features: [
                  "3 instâncias de bot",
                  "Comandos personalizados",
                  "Estatísticas avançadas",
                  "Suporte prioritário",
                ],
                highlight: true,
              },
              {
                name: "Business",
                price: "R$ 129",
                desc: "Para quem precisa de escala.",
                features: [
                  "10 instâncias de bot",
                  "API completa",
                  "Logs e auditoria",
                  "Suporte 24/7",
                ],
                highlight: false,
              },
            ].map((p) => (
              <Card
                key={p.name}
                className={`relative flex flex-col p-6 transition-all ${
                  p.highlight
                    ? "border-primary/50 bg-card shadow-elegant scale-[1.02]"
                    : "border-border/60 bg-card/50"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Mais popular
                  </div>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-6 ${p.highlight ? "bg-gradient-primary shadow-glow" : ""}`}
                  variant={p.highlight ? "default" : "outline"}
                >
                  <Link to="/registro">Assinar {p.name}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="sobre" className="border-t border-border/40 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <Bot className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Crie sua conta em segundos e conecte seu primeiro bot ao WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="bg-gradient-primary shadow-glow">
              <Link to="/registro">
                Criar conta agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://wa.me/17097013754" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>© {new Date().getFullYear()} Kira Bot. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-4">
            <CreditCard className="h-4 w-4" />
            <span className="text-xs">Pagamentos via Stripe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
