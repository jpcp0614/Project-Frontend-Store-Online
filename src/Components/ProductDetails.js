import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  addProduct = (id, title) => {
    const { location:
      { state: { product } }, cartFunc } = this.props;
    cartFunc(product);
    let cart = [];
    const newProduct = {
      id,
      title,

    };
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push(newProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  render() {
    const { location:
       { state: { title, thumbnail, price, attributes, id } } } = this.props;

    return (
      <div data-testid="product-detail-name">
        <h1>{`${title}`}</h1>
        <img src={ thumbnail } alt={ title } />
        <div>
          <h2>Detalhes do produto:</h2>
          <ul>
            {attributes.map((attribute) => (
              <li key={ attribute.id }>
                { `${attribute.name}: ${attribute.value_name}` }
              </li>
            ))}
          </ul>
        </div>
        <p>{ `R$${price.toFixed(2)}` }</p>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => this.addProduct(id, title) }
        >
          Adicionar ao carrinho
        </button>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          {' '}
          Ícone para carrinho de compras
        </Link>
      </div>
    );
  }
}
ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
      attributes: PropTypes.arrayOf(PropTypes.object),
      product: PropTypes.shape().isRequired,
    }).isRequired,
  }).isRequired,
  cartFunc: PropTypes.func.isRequired,
};

export default ProductDetails;
