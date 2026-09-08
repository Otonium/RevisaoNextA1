//Tela de erro
//Eventos de clique acontecem no navegador --> use client
"use client";
type ErrorProps = {
    error: Error;
    reset: () => void;
};
export default function Error({ error, reset }: ErrorProps) {
    return (
        <main>
            <h1>Ops! Algo deu errado.</h1>
            <p>Não foi possível carregar os produtos.</p>
            <p>
                <strong>Detalhe:</strong> {error.message}
            </p>
            <button onClick={() => reset()}>
                Tentar novamente
            </button>
        </main>
    );
}
