import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { product: { title, thumbnail, price } } = this.props;

    return (
      <div data-testid="product">
        <h2>
          { title }
        </h2>
        <img src={ thumbnail } alt={ title } />
        <p>
          { price }
        </p>
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
};

export default ProductCard;
