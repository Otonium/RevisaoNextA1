//Seção 7. Consumindo uma API no servidor
//Implementar com codigo do guia

import { Produto, RespostaProdutos } from "@/types/produto";
//Funcao assincrona --> espera resposta usando await, 
//faz requisicao http, retorna uma lista de produtos 
async function buscarProdutos(): Promise<Produto[]> {
  //Requisicao para a api
  const resposta = await fetch(
    "https://dummyjson.com/products?limit=12",
    {
      cache: "no-store",
    }
  );
  //Verificacao de erro 
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os produtos.");
  }
  //Conversao para JSON
  const dados: RespostaProdutos = await resposta.json();
  return dados.products;
}
export default async function Home() {
  const produtos = await buscarProdutos();
  return (
    <main>
      <h1>Catálogo de Produtos</h1>
      <p>Produtos carregados a partir de uma API externa.</p>
      <section>
        {produtos.map((produto) => (
          <article key={produto.id}>
            <img
              src={produto.thumbnail}
              alt={`Imagem do produto ${produto.title}`}
              width={180}
            />
            <h2>{produto.title}</h2>
            <p>{produto.description}</p>
            <p>
              <strong>Categoria:</strong> {produto.category}
            </p>
            <p>
              <strong>Preço:</strong> R$ {produto.price.toFixed(2)}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}