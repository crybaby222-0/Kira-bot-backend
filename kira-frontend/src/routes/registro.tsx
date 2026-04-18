import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-store";
import { ApiError } from "@/lib/api";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/registro")({
  head: () => ({ meta: [{ title: "Criar conta — Kira Bot" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuth((s) => s.register);
  const loading = useAuth((s) => s.loading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    try {
      await register(name, email, password);
      toast.success("Conta criada! Escolha um plano para começar.");
      navigate({ to: "/app/assinatura" });
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-hero px-4 py-8">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Kira Bot</span>
        </Link>

        <Card className="border-border/60 bg-card/80 p-6 shadow-elegant backdrop-blur-xl md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Criar conta</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Comece a gerenciar seu bot em minutos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="voce@exemplo.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">
                Sua senha será criptografada com bcrypt no servidor.
              </p>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary shadow-elegant"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
