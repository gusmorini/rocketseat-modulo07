import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable, Total } from './styles';

/**
 * desentruturação da props dentro das chaves
 */

function Cart({ cart, removeFromCart, updateAmount }) {
  function increment(prod) {
    updateAmount(prod.id, prod.amount + 1);
  }

  function decrement(prod) {
    updateAmount(prod.id, prod.amount - 1);
  }

  /**
   * O action apenas dispara a função
   * as verificações devem ser feitas
   * dentro do reducer Cart
   *
   * quem tem que se virar com a regra de negócio é o reducer
   * o front apenas dispara a função
   */

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>Qtd</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} />
                </td>
                <td>
                  <strong>{item.title}</strong>
                  <span>{item.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(item)}>
                      <MdRemoveCircleOutline />
                    </button>
                    <input type="text" readOnly value={item.amount} />
                    <button type="button" onClick={() => increment(item)}>
                      <MdAddCircleOutline />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>R$239,80</strong>
                </td>
                <td>
                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>Total:</span>
          <strong>R$239,80</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
