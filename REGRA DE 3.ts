// Define uma função que recebe quatro números e retorna o valor desconhecido
function regraDeTres(a: number, b: number, c: number, d: number): number {
  // Se o primeiro número for zero, retorna zero para evitar divisão por zero
  if (a === 0) {
    return 0;
  }
  // Calcula o valor desconhecido usando a fórmula da regra de três
  let x = (c * b) / a;
  // Retorna o valor arredondado para duas casas decimais
  return Math.round(x * 100) / 100;
}

// Exemplo de uso da função
console.log(regraDeTres(10, 50, 15, null)); // imprime 75
console.log(regraDeTres(5, 20, null, 12)); // imprime 3
console.log(regraDeTres(0, 10, 5, null)); // imprime 0
