// Define uma interface que representa o tipo de dados dos usuários
interface Usuario {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
}

// Define uma função que recebe um banco de dados como um array de usuários e imprime as informações na tela
function receberBancoDeDados(bancoDeDados: Usuario[]): void {
  // Percorre o array de usuários usando um laço for...of
  for (let usuario of bancoDeDados) {
    // Imprime o nome do usuário
    console.log("Nome: " + usuario.nome);
    // Imprime o endereço do usuário
    console.log("Endereço: " + usuario.endereco);
    // Imprime o telefone do usuário
    console.log("Telefone: " + usuario.telefone);
    // Imprime o email do usuário
    console.log("Email: " + usuario.email);
    // Imprime uma linha em branco para separar os usuários
    console.log();
  }
}

// Exemplo de uso da função
// Cria um array de usuários com alguns dados fictícios
let bancoDeDados = [
  {
    nome: "João Silva",
    endereco: "Rua das Flores, 123",
    telefone: "(11) 98765-4321",
    email: "joao.silva@gmail.com",
  },
  {
    nome: "Maria Santos",
    endereco: "Avenida Brasil, 456",
    telefone: "(11) 87654-3210",
    email: "maria.santos@hotmail.com",
  },
  {
    nome: "Pedro Oliveira",
    endereco: "Praça da Sé, 789",
    telefone: "(11) 76543-2109",
    email: "pedro.oliveira@yahoo.com",
  },
];

// Chama a função passando o array de usuários como argumento
receberBancoDeDados(bancoDeDados);
