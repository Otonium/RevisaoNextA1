//###########################################
//      API interna
//###########################################

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const resposta = await fetch(
            //URL da API
            "https://dummyjson.com/products?limit=12",
            {cache: "no-store",}
        );

        if (!resposta.ok) {
            return NextResponse.json(
                {erro: "Não foi possivel buscar os produtos na API esxterna.",},
                {status: resposta.status,}
            );
        }

        const dados = await resposta.json();

        return NextResponse.json(dados);
    } catch {
        return NextResponse.json(
            {erro: "Erro interno ao buscar produtos.",},
            {status: 500,}
        );
    }
}

export async function POST(request: Request) {
    try {
        const corpo = await request.json();

        const { title, price } = corpo;

        if (!title || !price) {
            return NextResponse.json(
                {erro: "Titulo e preço são obrigatórios.",},
                {status: 400,}
            );
        }

        return NextResponse.json(
            {mensagem: "Produto recebido com sucesso.",
                produto: {
                    id: Date.now(),
                    title,
                    price,
                },
            },
            {status: 201,}
        );
    } catch {return NextResponse.json(
        {erro: "Dados inválidos.",},
        {status: 400,}
    );}
}