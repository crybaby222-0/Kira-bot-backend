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

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Kira Bot" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const mockLogin = useAuth((s) => s.mockLogin);
  const loading = useAuth((s) => s.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const user = await login(email, password);
      toast.success("Bem-vindo de volta!");
      navigate({ to: user.role === "admin" ? "/admin" : "/app" });
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error("Não foi possível conectar ao servidor. Verifique a URL da API.");
      }
    }
  }

  function handleDemo(role: "user" | "admin") {
    mockLogin(role);
    toast.success(`Modo demo (${role}) ativado`);
    navigate({ to: role === "admin" ? "/admin" : "/app" });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-hero px-4">
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
            <h1 className="text-2xl font-bold">Entrar</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acesse seu dashboard Kira Bot
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  to="/recuperar-senha"
                  className="text-xs text-primary hover:underline"
                >
                  Esqueceu?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary shadow-elegant"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleDemo("user")}
            >
              Entrar como demo (usuário)
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => handleDemo("admin")}
            >
              Entrar como demo (admin)
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link to="/registro" className="font-medium text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
