import { Cliente } from "./types";

// Dados iniciais (mínimo 3 clientes exigido pelo enunciado)
const clientes: Cliente[] = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com" },
  { id: 2, nome: "Bruno Costa", email: "bruno@email.com" },
  { id: 3, nome: "Carla Souza", email: "carla@email.com" },
];

export function listarClientes(): Cliente[] {
  return clientes;
}

export function buscarClientePorId(id: number): Cliente | undefined {
  return clientes.find((c) => c.id === id);
}

export function cadastrarCliente(dados: Omit<Cliente, "id">): Cliente | string {
  if (!dados.nome || dados.nome.trim() === "") return "Erro: nome é obrigatório.";
  if (!dados.email || dados.email.trim() === "") return "Erro: e-mail é obrigatório.";

  // Valida e-mail duplicado
  if (clientes.some((c) => c.email.toLowerCase() === dados.email.toLowerCase()))
    return "Erro: e-mail já cadastrado.";

  const novoId = clientes.length > 0 ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;
  const novoCliente: Cliente = { id: novoId, ...dados };
  clientes.push(novoCliente);
  return novoCliente;
}