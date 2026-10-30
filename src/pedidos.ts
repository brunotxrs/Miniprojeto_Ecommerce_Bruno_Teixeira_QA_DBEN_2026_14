import { Pedido, ItemPedido } from "./types";
import { buscarClientePorId } from "./clientes";
import {
  obterItensCarrinho,
  limparCarrinho,
} from "./carrinho";
import { buscarProdutoPorId, reduzirEstoque } from "./produtos";

const pedidos: Pedido[] = [];
let proximoId = 1;

export function finalizarPedido(clienteId: number): Pedido | string {
  const cliente = buscarClientePorId(clienteId);
  if (!cliente) return "Erro: cliente não encontrado.";

  const itensCarrinho = obterItensCarrinho(clienteId);
  if (itensCarrinho.length === 0) return "Erro: carrinho vazio.";

  // 1ª validação: todos os itens têm estoque suficiente?
  // (garante que não haja registro parcial)
  for (const item of itensCarrinho) {
    const produto = buscarProdutoPorId(item.produtoId);
    if (!produto)
      return `Erro: produto ${item.produtoId} inexistente.`;
    if (item.quantidade > produto.estoque)
      return `Erro: estoque insuficiente para "${produto.nome}".`;
  }

  // Monta os itens do pedido com o preço praticado AGORA
  const itensPedido: ItemPedido[] = itensCarrinho.map((item) => {
    const produto = buscarProdutoPorId(item.produtoId)!;
    return {
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      precoUnitario: produto.preco,
      subtotal: produto.preco * item.quantidade,
    };
  });

  const total = itensPedido.reduce((soma, i) => soma + i.subtotal, 0);

  const pedido: Pedido = {
    id: proximoId++,
    clienteId,
    itens: itensPedido,
    total,
    data: new Date().toISOString(),
  };

  // Só agora desconta o estoque e limpa o carrinho
  for (const item of itensCarrinho) {
    reduzirEstoque(item.produtoId, item.quantidade);
  }
  limparCarrinho(clienteId);

  pedidos.push(pedido);
  return pedido;
}

export function listarPedidos(): Pedido[] {
  return pedidos;
}

export function listarPedidosPorCliente(clienteId: number): Pedido[] {
  return pedidos.filter((p) => p.clienteId === clienteId);
}