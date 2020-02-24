import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

import { ProductList } from './styles';

export default class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(pro => ({
      ...pro,
      priceFormatted: formatPrice(pro.price),
    }));

    this.setState({ products: data });
  }

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(pro => (
          <li key={String(pro.id)}>
            <img src={pro.image} alt={pro.title} />
            <strong>{pro.title}</strong>
            <span>{pro.priceFormatted}</span>

            <button type="button">
              <div>
                <MdAddShoppingCart /> 3
              </div>
              <span>Adicionar ao Carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
