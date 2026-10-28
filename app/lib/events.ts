/** The header's product menu lives outside <Products>, so it asks for a
 *  pack by event rather than by prop. */
export const SELECT_PRODUCT = "biogrowth:select-product";

export function selectProduct(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_PRODUCT, { detail: id }));
}
