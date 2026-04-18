import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Ban, CheckCircle2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/usuarios")({
  component: AdminUsers,
});

const mock = [
  { id: "u1", name: "João Silva", email: "joao@ex.com", plan: "Pro", status: "active" },
  { id: "u2", name: "Maria Souza", email: "maria@ex.com", plan: "Starter", status: "active" },
  { id: "u3", name: "Carlos Lima", email: "carlos@ex.com", plan: "Business", status: "active" },
  { id: "u4", name: "Ana Costa", email: "ana@ex.com", plan: "Pro", status: "expired" },
  { id: "u5", name: "Pedro Alves", email: "pedro@ex.com", plan: "—", status: "banned" },
];

function AdminUsers() {
  const [q, setQ] = useState("");
  const list = mock.filter(
    (u) =>
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Usuários</h1>
          <p className="text-sm text-muted-foreground">{mock.length} usuários no total</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead className="hidden md:table-cell">E-mail</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {u.email}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{u.plan}</Badge>
                </TableCell>
                <TableCell>
                  {u.status === "active" && (
                    <Badge className="border-success/30 bg-success/10 text-success" variant="outline">
                      Ativo
                    </Badge>
                  )}
                  {u.status === "expired" && (
                    <Badge className="border-warning/30 bg-warning/10" variant="outline">
                      Expirado
                    </Badge>
                  )}
                  {u.status === "banned" && (
                    <Badge variant="destructive">Banido</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.success("Plano alterado")}>
                        Alterar plano
                      </DropdownMenuItem>
                      {u.status === "banned" ? (
                        <DropdownMenuItem onClick={() => toast.success("Usuário desbanido")}>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-success" />
                          Desbanir
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.success("Usuário banido")}
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Banir
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
