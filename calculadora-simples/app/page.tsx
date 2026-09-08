// A calculadora em si
//Use client --> executada no navegador, necessario para detectar cliques
"use client";

//Guarda valores que mudam durante o uso
import { useState } from "react";

//Tipos personalizados. operacaoPendente só recebe estas operacoes
type Operacao = "+" | "-" | "x" | "÷";

export default function PaginaInicial() {
  const [valorVisor, definirValorVisor] = useState("0");
  const [valorAnterior, definirValorAnterior] = useState<number | null>(null);
  const [operacaoPendente, definirOperacaoPendente] =
    useState<Operacao | null>(null);
  const [deveSubstituirVisor, definirDeveSubstituirVisor] = useState(false);

  const teclasNumericas = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
  ];

  function formatarNumero(numero: number) {
    return Number(numero.toFixed(10)).toString();
  }

  //Funcao do calculo em si
  //Para fazer um calculo basico preciso:
  //dois numeros e uma operacao
  function calcularResultado(
    primeiroNumero: number,
    segundoNumero: number,
    operacao: Operacao
  ) {//Operacoes
    if (operacao === "+") {
      return primeiroNumero + segundoNumero;
    }

    if (operacao === "-") {
      return primeiroNumero - segundoNumero;
    }

    if (operacao === "x") {
      return primeiroNumero * segundoNumero;
    }

    if (operacao === "÷") {
      if (segundoNumero === 0) {
        return null;
      }

      return primeiroNumero / segundoNumero;
    }

    return null;
  }

  function adicionarNumero(numero: string) {
    if (valorVisor === "Erro" || deveSubstituirVisor) {
      definirValorVisor(numero);
      definirDeveSubstituirVisor(false);
      return;
    }

    if (valorVisor === "0") {
      definirValorVisor(numero);
      return;
    }

    definirValorVisor(valorVisor + numero);
  }

  function adicionarSeparadorDecimal() {
    if (valorVisor === "Erro") {
      definirValorVisor("0.");
      definirDeveSubstituirVisor(false);
      return;
    }

    if (deveSubstituirVisor) {
      definirValorVisor("0.");
      definirDeveSubstituirVisor(false);
      return;
    }

    if (!valorVisor.includes(".")) {
      definirValorVisor(valorVisor + ".");
    }
  }

  function limparCalculadora() {
    definirValorVisor("0");
    definirValorAnterior(null);
    definirOperacaoPendente(null);
    definirDeveSubstituirVisor(false);
  }

  function apagarUltimoNumero() {
    if (valorVisor === "Erro" || deveSubstituirVisor) {
      definirValorVisor("0");
      definirDeveSubstituirVisor(true);
      return;
    }

    const novoValor = valorVisor.slice(0, -1);

    if (novoValor === "" || novoValor === "-") {
      definirValorVisor("0");
      return;
    }

    definirValorVisor(novoValor);
  }

  function alterarSinal() {
    if (valorVisor === "0" || valorVisor === "Erro") {
      return;
    }

    if (valorVisor.startsWith("-")) {
      definirValorVisor(valorVisor.slice(1));
      return;
    }

    definirValorVisor("-" + valorVisor);
  }

  function calcularPorcentagem() {
    if (valorVisor === "Erro") {
      return;
    }

    const numeroAtual = Number(valorVisor);
    const resultado = numeroAtual / 100;

    definirValorVisor(formatarNumero(resultado));
    definirDeveSubstituirVisor(true);
  }

  function selecionarOperacao(novaOperacao: Operacao) {
    if (valorVisor === "Erro") {
      return;
    }

    const numeroAtual = Number(valorVisor);

    if (
      valorAnterior !== null &&
      operacaoPendente !== null &&
      !deveSubstituirVisor
    ) {
      const resultado = calcularResultado(
        valorAnterior,
        numeroAtual,
        operacaoPendente
      );

      if (resultado === null) {
        definirValorVisor("Erro");
        definirValorAnterior(null);
        definirOperacaoPendente(null);
        definirDeveSubstituirVisor(true);
        return;
      }

      definirValorVisor(formatarNumero(resultado));
      definirValorAnterior(resultado);
    } else {
      definirValorAnterior(numeroAtual);
    }

    definirOperacaoPendente(novaOperacao);
    definirDeveSubstituirVisor(true);
  }

  function finalizarCalculo() {
    if (
      valorAnterior === null ||
      operacaoPendente === null ||
      valorVisor === "Erro"
    ) {
      return;
    }

    const numeroAtual = Number(valorVisor);

    const resultado = calcularResultado(
      valorAnterior,
      numeroAtual,
      operacaoPendente
    );

    if (resultado === null) {
      definirValorVisor("Erro");
    } else {
      definirValorVisor(formatarNumero(resultado));
    }

    definirValorAnterior(null);
    definirOperacaoPendente(null);
    definirDeveSubstituirVisor(true);
  }

  return (
    <main className="pagina-calculadora">
      <section
        className="calculadora"
        aria-label="Calculadora simples"
      >
        <header className="cabecalho-calculadora">
          <p className="texto-superior">Next.js + TypeScript</p>

          <h1>Calculadora</h1>
        </header>

        <output
          className="visor"
          aria-live="polite"
        >
          {valorVisor}
        </output>

        <div className="grade-teclas">
          {/* Funções */}
          <button
            className="botao botao-funcao"
            type="button"
            onClick={limparCalculadora}
          >
            Limpar
          </button>

          <button
            className="botao botao-funcao"
            type="button"
            onClick={alterarSinal}
          >
            ±
          </button>

          <button
            className="botao botao-funcao"
            type="button"
            onClick={calcularPorcentagem}
          >
            %
          </button>

          {/* Divisão */}
          <button
            className="botao botao-operacao"
            type="button"
            onClick={() => selecionarOperacao("÷")}
          >
            ÷
          </button>

          {/* Números 7, 8 e 9 */}
          {teclasNumericas.slice(0, 3).map((numero) => (
            <button
              className="botao"
              type="button"
              key={numero}
              onClick={() => adicionarNumero(numero)}
            >
              {numero}
            </button>
          ))}

          {/* Multiplicação */}
          <button
            className="botao botao-operacao"
            type="button"
            onClick={() => selecionarOperacao("x")}
          >
            ×
          </button>

          {/* Números 4, 5 e 6 */}
          {teclasNumericas.slice(3, 6).map((numero) => (
            <button
              className="botao"
              type="button"
              key={numero}
              onClick={() => adicionarNumero(numero)}
            >
              {numero}
            </button>
          ))}

          {/* Subtração */}
          <button
            className="botao botao-operacao"
            type="button"
            onClick={() => selecionarOperacao("-")}
          >
            −
          </button>

          {/* Números 1, 2 e 3 */}
          {teclasNumericas.slice(6, 9).map((numero) => (
            <button
              className="botao"
              type="button"
              key={numero}
              onClick={() => adicionarNumero(numero)}
            >
              {numero}
            </button>
          ))}

          {/* Adição */}
          <button
            className="botao botao-operacao"
            type="button"
            onClick={() => selecionarOperacao("+")}
          >
            +
          </button>

          {/* Zero */}
          <button
            className="botao botao-zero"
            type="button"
            onClick={() => adicionarNumero("0")}
          >
            0
          </button>

          {/* Decimal */}
          <button
            className="botao"
            type="button"
            onClick={adicionarSeparadorDecimal}
          >
            .
          </button>

          {/* Resultado */}
          <button
            className="botao botao-igual"
            type="button"
            onClick={finalizarCalculo}
          >
            =
          </button>

          {/* Apagar */}
          <button
            className="botao botao-apagar"
            type="button"
            onClick={apagarUltimoNumero}
          >
            Apagar
          </button>
        </div>
      </section>
    </main>
  );
}