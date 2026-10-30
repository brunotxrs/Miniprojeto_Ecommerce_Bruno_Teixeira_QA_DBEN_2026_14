import {
  listarProdutos,
  cadastrarProduto,
  buscarProdutoPorId,
  buscarProdutosPorNome,
  filtrarPorCategoria,
  atualizarProduto,
  removerProduto,
} from "./produtos";
import { listarClientes, cadastrarCliente, buscarClientePorId } from "./clientes";
import {
  adicionarAoCarrinho,
  alterarQuantidade,
  removerDoCarrinho,
  listarCarrinho,
  calcularTotal,
} from "./carrinho";
import { finalizarPedido, listarPedidos, listarPedidosPorCliente } from "./pedidos";
import { relatorioVendas, relatorioEstoque, relatorioClientes } from "./relatorios";

function titulo(t: string) {
  console.log(`\n========== ${t} ==========`);
}

// ---------- PRODUTOS ----------
titulo("PRODUTOS");
console.log("Lista inicial:", listarProdutos());
console.log("Busca por id 1:", buscarProdutoPorId(1));
console.log("Busca por nome 'mouse':", buscarProdutosPorNome("mouse"));
console.log("Filtro categoria 'Periféricos':", filtrarPorCategoria("Periféricos"));

console.log("\nCadastro válido:", cadastrarProduto({
  nome: "Monitor LG", categoria: "Informática", preco: 900, estoque: 5,
}));

// ❌ SITUAÇÃO INVÁLIDA 1: produto com preço negativo
console.log("Cadastro inválido (preço -10):",
  cadastrarProduto({ nome: "Teste", categoria: "X", preco: -10, estoque: 1 }));

console.log("Atualização:", atualizarProduto(2, { preco: 99.9 }));
console.log("Remoção do produto id 3:", removerProduto(3));

// ---------- CLIENTES ----------
titulo("CLIENTES");
console.log("Lista inicial:", listarClientes());
console.log("Busca cliente id 2:", buscarClientePorId(2));
console.log("Novo cliente:", cadastrarCliente({ nome: "Diego Lima", email: "diego@email.com" }));

// ---------- CARRINHO ----------
titulo("CARRINHO");
console.log(adicionarAoCarrinho(1, 1, 2)); // 2 notebooks
console.log(adicionarAoCarrinho(1, 2, 3)); // 3 mouses
console.log("Carrinho do cliente 1:", listarCarrinho(1));
console.log("Total:", calcularTotal(1).toFixed(2));

console.log("Alterar quantidade do produto 2 para 5:", alterarQuantidade(1, 2, 5));
console.log("Total após alteração:", calcularTotal(1).toFixed(2));

// ❌ SITUAÇÃO INVÁLIDA 2: adicionar mais que o estoque
console.log("Adicionar 999 mouses:",
  adicionarAoCarrinho(1, 2, 999));

console.log(removerDoCarrinho(1, 2));
console.log("Total após remover produto 2:", calcularTotal(1).toFixed(2));

// ---------- PEDIDO ----------
titulo("PEDIDO");
const pedido = finalizarPedido(1);
console.log("Pedido criado:", pedido);
console.log("Estoque do produto 1 após compra:", buscarProdutoPorId(1)?.estoque);

// ❌ SITUAÇÃO INVÁLIDA 3: finalizar sem itens
console.log("Finalizar carrinho vazio:", finalizarPedido(2));

console.log("Pedidos do cliente 1:", listarPedidosPorCliente(1));
console.log("Todos os pedidos:", listarPedidos());

// ---------- RELATÓRIOS ----------
relatorioVendas();
relatorioEstoque();
relatorioClientes();