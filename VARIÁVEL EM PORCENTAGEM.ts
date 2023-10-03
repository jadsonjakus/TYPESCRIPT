// Define uma função que recebe um número e retorna uma string formatada como porcentagem
function formatarPorcentagem(valor: number): string {
  // Multiplica o valor por 100 e arredonda para duas casas decimais
  let porcentagem = Math.round(valor * 100 * 100) / 100;
  // Retorna a string com o símbolo de porcentagem
  return porcentagem + "%";
}

// Testa a função com alguns valores
console.log(formatarPorcentagem(0.5)); // imprime 50%
console.log(formatarPorcentagem(0.123)); // imprime 12.3%
console.log(formatarPorcentagem(1)); // imprime 100%
