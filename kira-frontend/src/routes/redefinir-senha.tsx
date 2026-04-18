import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/redefinir-senha")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  head: () => ({ meta: [{ title: "Redefinir senha — Kira Bot" }] }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const { token } = useSearch({ from: "/redefinir-senha" });
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) {
      toast.error("Token inválido.");
      return;
    }
    if (password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      await api.resetPassword(token, password);
      toast.success("Senha alterada! Faça login novamente.");
      navigate({ to: "/login" });
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-2xl font-bold">Nova senha</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Defina uma nova senha para sua conta.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirmar senha</Label>
              <Input
                id="confirm"
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary shadow-elegant"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                </>
              ) : (
                "Salvar nova senha"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
