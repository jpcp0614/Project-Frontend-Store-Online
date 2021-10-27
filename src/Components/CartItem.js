import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  constructor() {
    super();

    this.state = {
      quant: 1,
    };
  }

  incrementItem = () => {
    this.setState((prev) => ({
      quant: prev.quant + 1,
    }));
  }

  decrementItem = () => {
    const { quant } = this.state;

    if (quant > 1) {
      this.setState((prev) => ({
        quant: prev.quant - 1,
      }));
    }
  }

  render() {
    const { product, remove } = this.props;
    const { title, thumbnail, price } = product;
    const { quant } = this.state;

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
          { `Quantidade: ${quant}` }
        </p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.incrementItem }
        >
          +
        </button>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.decrementItem }
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
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export default CartItem;
