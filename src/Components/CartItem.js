import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  render() {
    const { product, remove, funcToIncrease, funcToDecrease } = this.props;
    const { title, thumbnail, price } = product;

    return (
      <div>
        <h2 data-testid="shopping-cart-product-name">
          { title }
        </h2>
        <img src={ thumbnail } alt={ title } />
        <p>
          { price }
        </p>
        <p data-testid="shopping-cart-product-quantity">
          { `Quantidade: ${product.quantidadeNoCarrinho}` }
        </p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ () => funcToIncrease(product) }
        >
          +
        </button>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ () => funcToDecrease(product) }
        >
          -
        </button>
        <button type="button" onClick={ () => remove(product) }>
          X
        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    quantidadeNoCarrinho: PropTypes.number,
  }).isRequired,
  remove: PropTypes.func.isRequired,
  funcToIncrease: PropTypes.func.isRequired,
  funcToDecrease: PropTypes.func.isRequired,
};

export default CartItem;
