export function parseBRL(value: string): number {
  return Number(
    value
      .replace(/[^\d,.-]/g, "") // tira R$, espaços e outros símbolos
      .replace(/\./g, "") // remove pontos de milhar
      .replace(",", ".") // troca vírgula decimal por ponto
  );
}

