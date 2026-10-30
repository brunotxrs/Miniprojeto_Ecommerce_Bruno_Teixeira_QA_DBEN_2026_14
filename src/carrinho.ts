import { ItemCarrinho, Produto } from "./types";
import { buscarProdutoPorId } from "./produtos";

// Carrinho de cada cliente (chave = clienteId)
const carrinhos: Map<number, ItemCarrinho[]> = new Map();

function obterCarrinho(clienteId: number): ItemCarrinho[] {
  if (!carrinhos.has(clienteId)) carrinhos.set(clienteId, []);
  return carrinhos.get(clienteId)!;
}

export function adicionarAoCarrinho(
  clienteId: number,
  produtoId: number,
  quantidade: number
): string {
  if (quantidade <= 0) return "Erro: quantidade deve ser maior que zero.";

  const produto = buscarProdutoPorId(produtoId);
  if (!produto) return "Erro: produto inexistente.";

  const carrinho = obterCarrinho(clienteId);
  const itemExistente = carrinho.find((i) => i.produtoId === produtoId);

  const quantidadeTotal = (itemExistente?.quantidade ?? 0) + quantidade;
  if (quantidadeTotal > produto.estoque)
    return `Erro: estoque insuficiente. Disponível: ${produto.estoque}.`;

  if (itemExistente) {
    itemExistente.quantidade = quantidadeTotal; // Atualiza em vez de duplicar
  } else {
    carrinho.push({ produtoId, quantidade });
  }
  return "Produto adicionado ao carrinho.";
}

export function alterarQuantidade(
  clienteId: number,
  produtoId: number,
  novaQuantidade: number
): string {
  if (novaQuantidade <= 0) return "Erro: quantidade deve ser maior que zero.";

  const produto = buscarProdutoPorId(produtoId);
  if (!produto) return "Erro: produto inexistente.";
  if (novaQuantidade > produto.estoque)
    return `Erro: estoque insuficiente. Disponível: ${produto.estoque}.`;

  const carrinho = obterCarrinho(clienteId);
  const item = carrinho.find((i) => i.produtoId === produtoId);
  if (!item) return "Erro: produto não está no carrinho.";

  item.quantidade = novaQuantidade;
  return "Quantidade atualizada.";
}

export function removerDoCarrinho(clienteId: number, produtoId: number): string {
  const carrinho = obterCarrinho(clienteId);
  const index = carrinho.findIndex((i) => i.produtoId === produtoId);
  if (index === -1) return "Erro: produto não está no carrinho.";
  carrinho.splice(index, 1);
  return "Produto removido do carrinho.";
}

export function listarCarrinho(clienteId: number): ItemCarrinho[] {
  return obterCarrinho(clienteId);
}

export function calcularSubtotal(item: ItemCarrinho): number {
  const produto = buscarProdutoPorId(item.produtoId);
  return produto ? produto.preco * item.quantidade : 0;
}

export function calcularTotal(clienteId: number): number {
  const carrinho = obterCarrinho(clienteId);
  return carrinho.reduce((total, item) => total + calcularSubtotal(item), 0);
}

export function limparCarrinho(clienteId: number): void {
  carrinhos.set(clienteId, []);
}

// Exporta o carrinho bruto para o módulo de pedidos usar
export function obterItensCarrinho(clienteId: number): ItemCarrinho[] {
  return obterCarrinho(clienteId);
}