import { listarPedidos } from "./pedidos";
import { listarProdutos } from "./produtos";
import { listarClientes } from "./clientes";

export function relatorioVendas(): void {
  const pedidos = listarPedidos();
  const totalVendido = pedidos.reduce((soma, p) => soma + p.total, 0);

  console.log("\n===== RELATÓRIO DE VENDAS =====");
  console.log(`Total de pedidos: ${pedidos.length}`);
  console.log(`Faturamento total: R$ ${totalVendido.toFixed(2)}`);
}

export function relatorioEstoque(): void {
  console.log("\n===== RELATÓRIO DE ESTOQUE =====");
  listarProdutos().forEach((p) => {
    console.log(`#${p.id} ${p.nome} — Estoque: ${p.estoque}`);
  });
}

export function relatorioClientes(): void {
  console.log("\n===== RELATÓRIO DE CLIENTES =====");
  listarClientes().forEach((c) => {
    console.log(`#${c.id} ${c.nome} — ${c.email}`);
  });
}