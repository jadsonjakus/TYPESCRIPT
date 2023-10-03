// Importa o pacote readline-sync para ler a entrada do usuário
import * as readline from 'readline-sync';

// Define uma função que verifica se um número está em um nó de segurança
function verificarNoSeguranca(numero: number): boolean {
  // Define um array com os números dos nós de segurança
  let nosSeguranca = [1, 3, 5, 7, 9, 11, 13, 15];
  // Retorna verdadeiro se o número estiver no array, falso caso contrário
  return nosSeguranca.includes(numero);
}

// Define uma função que cria uma janela a parte com uma mensagem
function criarJanela(mensagem: string): void {
  // Cria um elemento div na página HTML
  let janela = document.createElement('div');
  // Define o estilo da janela (cor, borda, posição, etc.)
  janela.style.backgroundColor = 'white';
  janela.style.border = 'solid black 2px';
  janela.style.position = 'fixed';
  janela.style.top = '50%';
  janela.style.left = '50%';
  janela.style.transform = 'translate(-50%, -50%)';
  janela.style.padding = '20px';
  // Cria um elemento p na janela com a mensagem
  let texto = document.createElement('p');
  texto.textContent = mensagem;
  // Adiciona o texto à janela
  janela.appendChild(texto);
  // Adiciona a janela ao corpo da página HTML
  document.body.appendChild(janela);
}

// Lê um número do usuário usando o pacote readline-sync
let numero = readline.questionInt('Digite um número de 1 a 15: ');

// Verifica se o número é válido (entre 1 e 15)
if (numero < 1 || numero > 15) {
  // Mostra uma mensagem de erro na console
  console.error('Número inválido!');
} else {
  // Verifica se o número está em um nó de segurança
  let resultado = verificarNoSeguranca(numero);
  // Mostra uma mensagem na console
  console.log('O número ' + numero + ' está em um nó de segurança? ' + resultado);
  // Cria uma janela a parte com a mesma mensagem
  criarJanela('O número ' + numero + ' está em um nó de segurança? ' + resultado);
}
