/**
 * Cores dos gráficos (paleta categórica validada para daltonismo).
 * A cor acompanha a entidade, nunca a posição no ranking.
 */
export const seriesColors = {
  receita: '#2a78d6',
  despesas: '#eb6834',
  lucro: '#1baf7a',
}

export const revenueCategoryColors: Record<string, string> = {
  Produtos: '#2a78d6',
  Serviços: '#eb6834',
  Assinaturas: '#1baf7a',
  Treinamentos: '#eda100',
}

/** Despesas por categoria: um único tom (a mesma cor da série "Despesas"). */
export const expenseBarColor = seriesColors.despesas
