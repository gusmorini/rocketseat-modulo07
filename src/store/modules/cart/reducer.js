import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, draft => {
        const index = draft.findIndex(p => p.id === action.product.id);

        if (index >= 0) {
          draft[index].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });

    case 'REMOVE_TO_CART':
      return produce(state, draft => {
        const index = draft.findIndex(i => i.id === action.id);

        if (index >= 0) {
          draft.splice(index, 1);
        }
      });

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
 *
 * yarn add immer
 * immerjs lida com objetos e arrays imutaveis
 * cria um rascunho, 'draft' entre o estado atual e o novo estado
 * esse rascunho pode ser manipulado de várias formas antes de
 * ser fixado como novo estado da aplicação
 *
 */
