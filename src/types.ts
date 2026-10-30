// Tipos centrais do sistema. Todos os módulos importam daqui.

export type Produto = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
};

export type Cliente = {
  id: number;
  nome: string;
  email: string;
};

export type ItemCarrinho = {
  produtoId: number;
  quantidade: number;
};

// Item do pedido guarda o preço praticado na compra (histórico imutável)
export type ItemPedido = {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
};

export type Pedido = {
  id: number;
  clienteId: number;
  itens: ItemPedido[];
  total: number;
  data: string;
};