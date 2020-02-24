import { call, put, all, takeLatest } from 'redux-saga/effects';
/**
 * call é responsável por chamar métodos asincronos que retornam uma promise
 */

import { addToCartSuccess } from './actions';

import api from '../../../services/api';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

/**
 * [*] depois da função singnifica generate, equivale a um async
 * é mais 'potente' que o async
 * o yield equivale ao await
 */

export default all([takeLatest('@cart/ADD_REQUEST', addToCartSuccess)]);
