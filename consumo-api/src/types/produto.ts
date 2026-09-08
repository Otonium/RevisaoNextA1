//Define estrutura dos dados --> Busca eles
export type Produto = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    thumbnail: string;
};

export type RespostaProdutos = { 
    products: Produto[];
    total: number;
    skip: number;
    limit: number;
};