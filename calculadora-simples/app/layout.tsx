//Estrutura geral da aplicação (programas) e dados da pagina
//Inicio
//O programa vai trabalhar com quatro estados principais
//Mostrar numero no visor; Guarda numero; Guard operação; Substituir numero
import type { Metadata as Metadados } from "next";
//Importar estilos gerais do projeto
import "./globals.css";

//Metadados, define o titulo da aba e descrição basica do site
export const metadados: Metadados = {
  title: "Calculadora Simples",
  description: "Uma calculadora criada com Next.js e TypeScript.",
};

//----------------------------------
//      Estrutura principal
//----------------------------------
//Função envolve todas as paginas do sistema 
export default function EstruturaPrincipal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt=BR">
      <body>{children}</body>
    </html>
  );
}