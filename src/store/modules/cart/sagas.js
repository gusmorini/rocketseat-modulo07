import { call, select, put, all, takeLatest } from 'redux-saga/effects';
/**
 * call é responsável por chamar métodos asincronos que retornam uma promise
 */
import { toast } from 'react-toastify';

import { addToCartSuccess, updateAmount } from './actions';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);
  // tratavivas do produto antes de ser adicionado ao carrinho
  // verifica se o produto já existe no carrinho
  const exists = yield select(state => state.cart.find(p => p.id === id));
  // busca a referencia do produto no estoque
  const stock = yield call(api.get, `stock/${id}`);
  // armazena somente o valor do amount estoque
  const stockAmount = stock.data.amount;
  // armazena o valor do amount antes da adição do novo produto
  // se o produto já existe armazena o valor se não existe vale 0
  const currentAmount = exists ? exists.amount : 0;
  // define o novo amount do produto
  const amount = currentAmount + 1;

  // se o novo amount for maior que o estoque disponível retorna erro
  if (amount > stockAmount) {
    // exibe o alerta na tela
    toast.error('Estoque Insulficiente');
    return;
  }

  if (exists) {
    // se existe só altera a quantidade
    yield put(updateAmount(id, amount));
  } else {
    // se não existe adiciona o novo produto
    const data = {
      ...response.data,
      amount,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
  }
}

/**
 * [*] depois da função singnifica generate, equivale a um async
 * é mais 'potente' que o async
 * o yield equivale ao await
 * select é responsável por buscar informações dentro do estado
 * sempre que usar um effects do saga necessita utilizar yield na frente
 */

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
