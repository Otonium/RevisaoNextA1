//A pagina ficara disponivel 
//em http://localhost:3000/produtos-client
//Funcionamento: 
//Usuario digita n campo > evento onChange atualiza
//estado de busca > codigo filtra produto > produtos aparecem
"use client";
import { useEffect, useState } from "react";
import { Produto, RespostaProdutos } from "@/types/produto";
//Estaos com useStade: Armazena, controla, atualiza
export default function ProdutosClient() {
    //Armazena produtos recebidos da api
    const [produtos, setProdutos] = useState<Produto[]>([]);
    //Controla a mensagem de carregamento
    const [carregando, setCarregando] = useState(true);
    //Armazena mensagem de erro
    const [erro, setErro] = useState("");
    
    //--Busca local de produtos------------------------------------
    const [busca, setBusca] = useState("");
    //------------------------------------------------------------
    async function carregarProdutos() {
        //Tenta buscar dados da api, finally --> executa sempre
        try {
            setCarregando(true);
            setErro("");
            const resposta = await fetch(
                "https://dummyjson.com/products?limit=12"
            );
            if (!resposta.ok) {
                throw new Error("A API respondeu com erro.");
            }
            const dados: RespostaProdutos = await resposta.json();
            setProdutos(dados.products);
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Ocorreu um erro desconhecido.");
            }
        } finally {
            setCarregando(false);
        }
    }
    useEffect(() => {
        carregarProdutos();
    }, []);

    //--Busca local de produtos------------------------------------
    const produtosFiltrados = produtos.filter((produto) =>
        produto.title.toLowerCase().includes(busca.toLowerCase())
    );
    //------------------------------------------------------------

    return (
        <main>
            <h1>Produtos carregados no navegador</h1>
            <button onClick={carregarProdutos}>
                Atualizar produtos
            </button>

            <input
                type="text"
                placeholder="Digite o nome de um produto..."
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
            />

            {carregando && <p>Carregando produtos...</p>}
            {erro && <p>Erro: {erro}</p>}
            {!carregando && !erro && (
                <section>
                    {/* --Busca local de produtos-- */}
                    {produtosFiltrados.map((produto) => (
                        <article key={produto.id}>
                            <img
                                src={produto.thumbnail}
                                alt={`Imagem do produto ${produto.title}`}
                                width={180}
                            />
                            <h2>{produto.title}</h2>
                            <p>{produto.description}</p>
                            <strong>R$ {produto.price.toFixed(2)}</strong>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}
