export async function getCategories() {
  const requestReturn = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestObject = await requestReturn.json();
  return requestObject;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const requestReturn = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const requestObject = await requestReturn.json();
  return requestObject;
}
