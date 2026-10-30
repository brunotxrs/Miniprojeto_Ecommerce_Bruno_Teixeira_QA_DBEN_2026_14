import { Produto } from "./types";

// Dados iniciais (mínimo 3 produtos exigido pelo enunciado)
const produtos: Produto[] = [
  { id: 1, nome: "Notebook Dell", categoria: "Informática", preco: 3500, estoque: 10 },
  { id: 2, nome: "Mouse Logitech", categoria: "Periféricos", preco: 120, estoque: 50 },
  { id: 3, nome: "Teclado Mecânico", categoria: "Periféricos", preco: 250, estoque: 20 },
];

export function listarProdutos(): Produto[] {
  return produtos;
}

export function buscarProdutoPorId(id: number): Produto | undefined {
  return produtos.find((p) => p.id === id);
}

export function buscarProdutosPorNome(termo: string): Produto[] {
  return produtos.filter((p) =>
    p.nome.toLowerCase().includes(termo.toLowerCase())
  );
}

export function filtrarPorCategoria(categoria: string): Produto[] {
  return produtos.filter(
    (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
  );
}

export function cadastrarProduto(dados: Omit<Produto, "id">): Produto | string {
  // Validações obrigatórias
  if (!dados.nome || dados.nome.trim() === "") return "Erro: nome é obrigatório.";
  if (dados.preco <= 0) return "Erro: preço deve ser maior que zero.";
  if (dados.estoque < 0) return "Erro: estoque não pode ser negativo.";

  // Gera id único
  const novoId = produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
  const novoProduto: Produto = { id: novoId, ...dados };
  produtos.push(novoProduto);
  return novoProduto;
}

export function atualizarProduto(
  id: number,
  dados: Partial<Omit<Produto, "id">>
): Produto | string {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return "Erro: produto não encontrado.";

  if (dados.nome !== undefined && dados.nome.trim() === "")
    return "Erro: nome não pode ser vazio.";
  if (dados.preco !== undefined && dados.preco <= 0)
    return "Erro: preço deve ser maior que zero.";
  if (dados.estoque !== undefined && dados.estoque < 0)
    return "Erro: estoque não pode ser negativo.";

  Object.assign(produto, dados);
  return produto;
}

export function removerProduto(id: number): boolean {
  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1) return false;
  produtos.splice(index, 1);
  return true;
}

// Função auxiliar usada pelo módulo de pedidos
export function reduzirEstoque(produtoId: number, quantidade: number): void {
  const produto = produtos.find((p) => p.id === produtoId);
  if (produto) produto.estoque -= quantidade;
}