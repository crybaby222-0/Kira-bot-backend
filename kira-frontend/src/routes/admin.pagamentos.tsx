import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/pagamentos")({
  component: AdminPayments,
});

const payments = [
  { id: "pi_1", user: "João Silva", plan: "Pro", amount: "R$ 49,00", status: "succeeded", date: "2 min atrás" },
  { id: "pi_2", user: "Maria Souza", plan: "Starter", amount: "R$ 19,00", status: "succeeded", date: "15 min" },
  { id: "pi_3", user: "Carlos Lima", plan: "Business", amount: "R$ 129,00", status: "succeeded", date: "1h" },
  { id: "pi_4", user: "Ana Costa", plan: "Pro", amount: "R$ 49,00", status: "failed", date: "3h" },
  { id: "pi_5", user: "Lucas R.", plan: "Pro", amount: "R$ 49,00", status: "refunded", date: "ontem" },
];

function AdminPayments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Pagamentos</h1>
        <p className="text-sm text-muted-foreground">
          Histórico de transações via Stripe.
        </p>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {p.id}
                </TableCell>
                <TableCell className="font-medium">{p.user}</TableCell>
                <TableCell>
                  <Badge variant="outline">{p.plan}</Badge>
                </TableCell>
                <TableCell className="font-medium">{p.amount}</TableCell>
                <TableCell>
                  {p.status === "succeeded" && (
                    <Badge className="border-success/30 bg-success/10 text-success" variant="outline">
                      Aprovado
                    </Badge>
                  )}
                  {p.status === "failed" && <Badge variant="destructive">Falhou</Badge>}
                  {p.status === "refunded" && (
                    <Badge variant="outline">Reembolsado</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {p.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
