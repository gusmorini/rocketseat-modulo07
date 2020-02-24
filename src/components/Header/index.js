import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header({ cart }) {
  const cont = cart.length;
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>
            {cont} {cont !== 1 ? 'itens' : 'item'}
          </span>
        </div>
        <MdShoppingBasket />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cart: state.cart,
}))(Header);

/**
 * state.cart se refere ao reducer cart criado no rootReducer
 * ele pode ser acessado dentro da classe pelo props.cart
 */
