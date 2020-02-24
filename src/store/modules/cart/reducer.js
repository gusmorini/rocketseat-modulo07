export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        ...state,
        {
          ...action.product,
          amount: 1,
        },
      ];
    default:
      return state;
  }
}

/**
 * state é o estado atual antes de qualquer alteração
 * action é as propriedades passadas para dentro do reducer
 * dentro dela o type que define dentro do swich qual ação deve ser tomada
 *
 * se a ação não for encontrada no switch ele retorna por defualt
 * o valor atual do state sem alteração.
 */
