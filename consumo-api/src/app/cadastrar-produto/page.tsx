//A página estará disponível em:
//http://localhost:3000/cadastrar-produto

"use client";
import { FormEvent, useState } from "react";
export default function CadastrarProduto() {
    const [titulo, setTitulo] = useState("");
    const [preco, setPreco] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    async function cadastrarProduto(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setMensagem("");
            setErro("");

            const resposta = await fetch("/apu/produtos", {
                method: "POST",
                headers: {
                    "Constent-Type": "application/json",
                },
                body: JSON.stringify({
                    title: titulo,
                    price: Number(preco),
                }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Não foi possivel cadastrar.");
            }

            setMensagem(`Produto "${dados.produto.title}" cadastrado com sucesso.`);

            setTitulo("");
            setPreco("");
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Ocorreu um erro desconhecido.");
            }
        }
    }

    return (
        <main>
            <h1>Cadastrar produto</h1>
            <form onSubmit={cadastrarProduto}>
                <label htmlFor="titulo">
                    Nome do produto
                </label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(event) => setTitulo(event.target.value)}
                    placeholder="Ex.: Teclado mecânico"
                />
                <label htmlFor="preco">
                    Preço
                </label>
                <input
                    id="preco"
                    type="number"
                    min="0"
                    step="0.01"
                    value={preco}
                    onChange={(event) => setPreco(event.target.value)}
                    placeholder="Ex.: 199.90"
                />
                <button type="submit">
                    Cadastrar produto
                </button>
            </form>
            {mensagem && <p>{mensagem}</p>}
            {erro && <p>Erro: {erro}</p>}
        </main>
    );
}
