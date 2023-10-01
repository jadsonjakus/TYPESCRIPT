// Importa o módulo crypto para gerar hashes e assinaturas
import * as crypto from "crypto";

// Define uma classe que representa uma transação
class Transacao {
  // Define as propriedades da transação: remetente, destinatário, valor e assinatura
  remetente: string;
  destinatario: string;
  valor: number;
  assinatura: string;

  // Define o construtor da transação que recebe os dados como argumentos
  constructor(remetente: string, destinatario: string, valor: number) {
    this.remetente = remetente;
    this.destinatario = destinatario;
    this.valor = valor;
    this.assinatura = "";
  }

  // Define um método que calcula o hash da transação usando o algoritmo SHA256
  calcularHash(): string {
    return crypto
      .createHash("sha256")
      .update(this.remetente + this.destinatario + this.valor)
      .digest("hex");
  }

  // Define um método que assina a transação usando a chave privada do remetente
  assinarTransacao(chavePrivada: string): void {
    // Verifica se o remetente é válido
    if (this.remetente.length < 1 || this.remetente.length > 11) {
      throw new Error("Remetente inválido");
    }
    // Verifica se o destinatário é válido
    if (this.destinatario.length < 1 || this.destinatario.length > 11) {
      throw new Error("Destinatário inválido");
    }
    // Verifica se o valor é positivo
    if (this.valor <= 0) {
      throw new Error("Valor inválido");
    }
    // Cria um objeto de assinatura usando o algoritmo ECDSA com a curva secp256k1
    const assinador = crypto.createSign("SHA256");
    // Atualiza o objeto de assinatura com o hash da transação
    assinador.update(this.calcularHash());
    // Finaliza o objeto de assinatura com a chave privada do remetente
    const assinatura = assinador.sign(chavePrivada, "hex");
    // Atribui a assinatura à propriedade da transação
    this.assinatura = assinatura;
  }

  // Define um método que verifica se a transação é válida usando a chave pública do remetente
  verificarTransacao(chavePublica: string): boolean {
    // Verifica se a transação é do sistema, ou seja, sem remetente
    if (this.remetente === "") {
      return true;
    }
    // Verifica se a transação tem uma assinatura
    if (this.assinatura === "") {
      throw new Error("Transação não assinada");
    }
    // Cria um objeto de verificação usando o algoritmo ECDSA com a curva secp256k1
    const verificador = crypto.createVerify("SHA256");
    // Atualiza o objeto de verificação com o hash da transação
    verificador.update(this.calcularHash());
    // Retorna o resultado da verificação usando a chave pública do remetente e a assinatura da transação
    return verificador.verify(chavePublica, this.assinatura, "hex");
  }
}

// Define uma classe que representa um bloco
class Bloco {
  // Define as propriedades do bloco: índice, timestamp, transações, hash anterior, hash atual e nonce
  indice: number;
  timestamp: number;
  transacoes: Transacao[];
  hashAnterior: string;
  hashAtual: string;
  nonce: number;

  // Define o construtor do bloco que recebe os dados como argumentos
  constructor(
    indice: number,
    timestamp: number,
    transacoes: Transacao[],
    hashAnterior: string
  ) {
    this.indice = indice;
    this.timestamp = timestamp;
    this.transacoes = transacoes;
    this.hashAnterior = hashAnterior;
    this.hashAtual = this.calcularHash();
    this.nonce = 0;
  }

  // Define um método que calcula o hash do bloco usando o algoritmo SHA256
  calcularHash(): string {
    return crypto
      .createHash("sha256")
      .update(
        this.indice +
          this.timestamp +
          JSON.stringify(this.transacoes) +
          this.hashAnterior +
          this.nonce
      )
      .digest("hex");
  }

  // Define um método que minera o bloco usando uma dificuldade definida
  minerarBloco(dificuldade: number): void {
    // Enquanto o hash atual não começar com uma quantidade de zeros igual à dificuldade, incrementa o nonce e recalcula o hash
    while (
      this.hashAtual.substring(0, dificuldade) !== "0".repeat(dificuldade)
    ) {
      this.nonce++;
      this.hashAtual = this.calcularHash();
    }
    // Imprime o hash atual na tela
    console.log("Bloco minerado: " + this.hashAtual);
  }

  // Define um método que verifica se as transações do bloco são válidas
  verificarTransacoes(): boolean {
    // Percorre as transações do bloco usando um laço for...of
    for (let transacao of this.transacoes) {
      // Verifica se a transação é válida usando a chave pública do remetente
      if (!transacao.verificarTransacao(transacao.remetente)) {
        return false;
      }
    }
    return true;
  }
}

// Define uma classe que representa um blockchain
class Blockchain {
  // Define as propriedades do blockchain: cadeia de blocos, dificuldade, lista de nós e lista de endereços
  cadeia: Bloco[];
  dificuldade: number;
  nos: string[];
  enderecos: Map<string, string>;

  // Define o construtor do blockchain que inicializa os dados
  constructor() {
    // Cria um array com o bloco gênesis, ou seja, o primeiro bloco da cadeia
    this.cadeia = [this.criarBlocoGenesis()];
    // Define a dificuldade de mineração como 2, ou seja, o hash deve começar com dois zeros
    this.dificuldade = 2;
    // Cria um array vazio para armazenar os endereços dos nós da rede
    this.nos = [];
    // Cria um mapa vazio para armazenar os pares de chave pública e chave privada dos endereços dos usuários
    this.enderecos = new Map();
  }

  // Define um método que cria o bloco gênesis com dados arbitrários
  criarBlocoGenesis(): Bloco {
    // Cria uma transação do sistema para o primeiro usuário com 100 unidades da moeda
    let transacaoGenesis = new Transacao(
      "",
      "00000000001",
      100 * Math.pow(10, -8)
    );
    // Cria um bloco com índice 0, timestamp atual, transação do sistema e hash anterior nulo
    let blocoGenesis = new Bloco(0, Date.now(), [transacaoGenesis], "0");
    // Retorna o bloco gênesis
    return blocoGenesis;
  }

  // Define um método que retorna o último bloco da cadeia
  obterUltimoBloco(): Bloco {
    return this.cadeia[this.cadeia.length - 1];
  }

  // Define um método que adiciona um novo bloco à cadeia
  adicionarBloco(novoBloco: Bloco): void {
    // Atribui o hash atual do último bloco ao hash anterior do novo bloco
    novoBloco.hashAnterior = this.obterUltimoBloco().hashAtual;
    // Minera o novo bloco usando a dificuldade definida
    novoBloco.minerarBloco(this.dificuldade);
    // Adiciona o novo bloco ao final da cadeia
    this.cadeia.push(novoBloco);
  }

  // Define um método que verifica se a cadeia é válida
  verificarCadeia(): boolean {
    // Percorre a cadeia a partir do segundo bloco usando um laço for tradicional
    for (let i = 1; i < this.cadeia.length; i++) {
      // Armazena o bloco atual e o bloco anterior em variáveis