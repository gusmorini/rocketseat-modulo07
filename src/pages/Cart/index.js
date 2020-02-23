import React from 'react';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
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
          <tr>
            <td>
              <img
                src="https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(90)/adaption/catalog/kits/2-pares/preto-cinza.jpg"
                alt="Tênis"
              />
            </td>
            <td>
              <strong>Tênis zuado</strong>
              <span>R$119,90</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline />
                </button>
                <input type="text" readOnly value={2} />
                <button type="button">
                  <MdAddCircleOutline />
                </button>
              </div>
            </td>
            <td>
              <strong>R$239,80</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete />
              </button>
            </td>
          </tr>
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
