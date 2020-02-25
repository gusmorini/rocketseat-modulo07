import { call, select, put, all, takeLatest } from 'redux-saga/effects';
/**
 * call é responsável por chamar métodos asincronos que retornam uma promise
 */

import { addToCartSuccess, updateAmount } from './actions';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);
  // tratavivas do produto antes de ser adicionado ao carrinho
  // verifica se o produto já existe no carrinho
  const exists = yield select(state => state.cart.find(p => p.id === id));
  if (exists) {
    // se existe só altera a quantidade para + 1
    const amount = exists.amount + 1;
    yield put(updateAmount(id, amount));
  } else {
    // se não existe adiciona o novo produto com quantidade = 1
    const data = {
      ...response.data,
      amount: 1,
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
