# Miniprojeto E-commerce — Bruno Teixeira

**Estudante:** Bruno Teixeira
**Turma:** QA DBEN 2026/14

---

## 📖 Objetivo

Sistema de gerenciamento de e-commerce desenvolvido em **TypeScript + Node.js**, operando inteiramente em memória. O projeto implementa as principais operações de uma loja virtual: catálogo de produtos, cadastro de clientes, carrinho de compras, finalização de pedidos e geração de relatórios.

O foco é demonstrar organização de código, tipagem explícita, modularização e aplicação de regras de negócio.

---

## ⚙️ Funcionalidades implementadas

### Produtos
- Cadastro de novos produtos com validação (nome, preço > 0, estoque >= 0, id único).
- Listagem completa do catálogo.
- Busca por identificador (`id`).
- Busca por parte do nome (case-insensitive).
- Filtro por categoria.
- Atualização parcial de informações.
- Remoção de produtos do catálogo.

### Clientes
- Cadastro com validação (nome, e-mail, e-mail único, id único).
- Listagem de todos os clientes.
- Busca por identificador.

### Carrinho de compras
- Adicionar produtos ao carrinho (por cliente).
- Alterar quantidade de um item já adicionado.
- Remover itens do carrinho.
- Listar itens do carrinho.
- Cálculo de subtotal por item.
- Cálculo do total do carrinho.
- Validação de quantidade > 0 e de estoque disponível.
- Se o mesmo produto for adicionado novamente, a quantidade é somada (sem duplicar linhas).

### Pedidos
- Finalização de compra a partir do carrinho.
- Registro do cliente, itens, quantidades, preços praticados no momento da compra, total e data.
- Geração de identificador único por pedido.
- Validação completa antes de registrar (cliente existe, carrinho com itens, estoque suficiente para todos os itens).
- Atualização do estoque somente após validação total (sem registros parciais).
- Consulta de todos os pedidos.
- Consulta de pedidos por cliente.

### Relatórios
- Relatório de vendas (quantidade de pedidos e faturamento total).
- Relatório de estoque.
- Relatório de clientes.

---

## 🧰 Tecnologias utilizadas

- **TypeScript** — tipagem estática e organização modular.
- **Node.js** — execução do código compilado.
- **Git / GitHub** — versionamento e entrega.

Não foram utilizadas bibliotecas externas, frameworks, banco de dados ou persistência em arquivos.

---

## 📂 Estrutura dos arquivos

```
Miniprojeto_Ecommerce_Bruno_Teixeira_QA_DBEN_2026_14/
├── src/
│   ├── types.ts         # Tipos centrais (Produto, Cliente, ItemCarrinho, ItemPedido, Pedido)
│   ├── produtos.ts      # Cadastro, consulta, atualização e remoção de produtos
│   ├── clientes.ts      # Cadastro e consulta de clientes
│   ├── carrinho.ts      # Operações e cálculos do carrinho
│   ├── pedidos.ts       # Finalização e consulta de pedidos
│   ├── relatorios.ts    # Funções de consolidação e apresentação
│   └── main.ts          # Demonstração das funcionalidades
├── dist/                # Código JavaScript compilado (gerado pelo tsc)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Instruções de compilação e execução

### Pré-requisitos
- Node.js instalado (versão 16 ou superior).
- npm instalado.

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/brunotxrs/Miniprojeto_Ecommerce_Bruno_Teixeira_QA_DBEN_2026_14.git
   cd Miniprojeto_Ecommerce_Bruno_Teixeira_QA_DBEN_2026_14
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Compile o TypeScript:
   ```bash
   npm run build
   ```

4. Execute a aplicação:
   ```bash
   npm start
   ```

   Ou em um único comando:
   ```bash
   npm run dev
   ```

---

## 🧪 Exemplos das principais operações

### Cadastrar produto
```typescript
cadastrarProduto({
  nome: "Monitor LG",
  categoria: "Informática",
  preco: 900,
  estoque: 5
});
// → { id: 4, nome: "Monitor LG", categoria: "Informática", preco: 900, estoque: 5 }
```

### Adicionar ao carrinho e calcular total
```typescript
adicionarAoCarrinho(1, 1, 2); // 2 unidades do produto 1 para o cliente 1
calcularTotal(1);
// → 7000.00
```

### Finalizar pedido
```typescript
finalizarPedido(1);
// → { id: 1, clienteId: 1, itens: [...], total: 7000, data: "..." }
```

### Situações inválidas demonstradas em `main.ts`
- Cadastrar produto com preço negativo → retorna mensagem de erro.
- Adicionar ao carrinho quantidade superior ao estoque → retorna mensagem de erro.
- Finalizar pedido com carrinho vazio → retorna mensagem de erro.

---

## 📜 Regras de negócio implementadas

- **Produto:** id único, nome não vazio, preço > 0, estoque >= 0.
- **Cliente:** id único, e-mail único, nome e e-mail obrigatórios.
- **Carrinho:**
  - Quantidade deve ser maior que zero.
  - Produto precisa existir.
  - Quantidade não pode ultrapassar o estoque.
  - Produto repetido atualiza a quantidade (não duplica linha).
- **Pedido:**
  - Cliente precisa existir.
  - Carrinho precisa ter ao menos um item.
  - Todos os itens precisam ter estoque suficiente (validação antes de qualquer alteração).
  - Preço no pedido é congelado no momento da compra (histórico imutável).
  - Estoque só é reduzido após validação completa — não há registro parcial.
  - Id do pedido é gerado automaticamente e é único.

---

## ⚠️ Limitações conhecidas

- Os dados residem apenas em memória: ao encerrar a aplicação, tudo é perdido.
- Não há interface gráfica, API REST ou persistência em banco/JSON.
- Não há autenticação, controle de pagamento, frete ou cupons.
- A aplicação é demonstrativa e não deve ser utilizada em produção.

---

## ✅ Conclusão

O projeto atende às funcionalidades obrigatórias do desafio, aplicando TypeScript com tipagem explícita, organização em módulos, uso de métodos de array (`find`, `filter`, `map`, `reduce`) e validações de regras de negócio. A execução via `main.ts` demonstra o fluxo completo de compra, incluindo situações de sucesso e de erro.

---

## 👤 Autor

**Bruno Teixeira**
- GitHub: [@brunotxrs](https://github.com/brunotxrs)

---
*Projeto acadêmico desenvolvido para o Senai - Carreira Tech - Trilha Desenvolvimento de Software.*

