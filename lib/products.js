import { PRODUCTS, URLS } from './constants';

export function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function getProductPath(productOrId) {
  const id = typeof productOrId === 'string' ? productOrId : productOrId?.id;
  return id ? `/shop/${id}` : '/shop';
}

export function getProductCheckoutUrl(product) {
  if (!product) return URLS.gumroad;
  if (product.checkout === 'bmac') return product.url || URLS.bmac;
  return product.url || URLS.gumroad;
}

export function getProductCheckoutLabel(product) {
  if (!product) return 'Continue to Gumroad';
  if (product.checkout === 'bmac') return 'Open membership';
  if (product.price === 'Free') return 'Download on Gumroad';
  return 'Continue to Gumroad';
}

export function getProductCheckoutNote(product) {
  if (product?.checkout === 'bmac') {
    return 'Buy Me a Coffee holds Magnolia Circle. Tips live there too.';
  }
  return 'Gumroad takes payment and emails the file. Named listings appear there as they go live.';
}

export function getRelatedProducts(product, limit = 3) {
  if (!product) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter((p) => p.id !== product.id).slice(0, limit);
}
