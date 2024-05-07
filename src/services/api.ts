export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');

  const data = await result.json();

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);

  const data = await result.json();

  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}

export async function getProductByQuery(query: string) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);

  const data = await result.json();
  return data.results;
}

export async function getProductByCategoryId(categoryId: string) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const data = await result.json();
  return data.results;
}
