import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { product, cartFunc } = this.props;
    const { title, thumbnail, price } = product;

    return (
      <div data-testid="product">
        <h2>
          { title }
        </h2>
        <img src={ thumbnail } alt={ title } />
        <p>
          { price }
        </p>
        <button
          type="button"
          onClick={ () => cartFunc(product) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  cartFunc: PropTypes.func.isRequired,
};

export default ProductCard;
