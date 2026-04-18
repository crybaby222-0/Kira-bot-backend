import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({ meta: [{ title: "Recuperar senha — Kira Bot" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.forgotPassword(email);
      setSent(true);
      toast.success("E-mail enviado! Verifique sua caixa de entrada.");
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
          <Link
            to="/login"
            className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Voltar ao login
          </Link>
          <h1 className="text-2xl font-bold">Recuperar senha</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enviaremos um link para você criar uma nova senha.
          </p>

          {sent ? (
            <div className="mt-6 rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-foreground">
              Link de recuperação enviado para <strong>{email}</strong>. Verifique também a
              pasta de spam.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-primary shadow-elegant"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  "Enviar link"
                )}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
