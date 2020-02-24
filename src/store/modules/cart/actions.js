export function addToCart(product) {
  return {
    type: '@cart/ADD',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

/**
 * dica, dar o type para action com o nome do módulo
 * facilita o debu
 */
