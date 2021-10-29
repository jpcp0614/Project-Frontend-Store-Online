import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    const { location:
      { state: { product } }, rateFunc } = this.props;
    rateFunc({ target: {
      type: '',
    } }, product);
  }

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
      { state: { title, thumbnail, price, attributes, id,
        product } }, rateFunc } = this.props;
    const { rateAndComment } = product;

    return (
      <div data-testid="product-detail-name">
        <h1>{`${title}`}</h1>
        <img src={ thumbnail } alt={ title } />
        <div>
          <h2>Detalhes do produto:</h2>
          <ul>
            {attributes.map((attribute) => (
              <li key={ attribute.id }>
                {`${attribute.name}: ${attribute.value_name}`}
              </li>
            ))}
          </ul>
        </div>
        <p>{`R$${price.toFixed(2)}`}</p>
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
        <form>
          <span>Nota:</span>
          <label htmlFor="rating1">
            1
            <input
              type="radio"
              name="rating"
              id="rating1"
              value="1"
              checked={ rateAndComment.rate === '1' }
              onChange={ (event) => rateFunc(event, product) }
            />
          </label>
          <label htmlFor="rating2">
            2
            <input
              type="radio"
              name="rating"
              id="rating2"
              value="2"
              checked={ rateAndComment.rate === '2' }
              onChange={ (event) => rateFunc(event, product) }
            />
          </label>
          <label htmlFor="rating3">
            3
            <input
              type="radio"
              name="rating"
              id="rating3"
              value="3"
              checked={ rateAndComment.rate === '3' }
              onChange={ (event) => rateFunc(event, product) }
            />
          </label>
          <label htmlFor="rating4">
            4
            <input
              type="radio"
              name="rating"
              id="rating4"
              value="4"
              checked={ rateAndComment.rate === '4' }
              onChange={ (event) => rateFunc(event, product) }
            />
          </label>
          <label htmlFor="rating5">
            5
            <input
              type="radio"
              name="rating"
              id="rating5"
              value="5"
              checked={ rateAndComment.rate === '5' }
              onChange={ (event) => rateFunc(event, product) }
            />
          </label>

          <label htmlFor="comment">
            <textarea
              data-testid="product-detail-evaluation"
              style={ { resize: 'vertical' } }
              type="text"
              id="comment"
              value={ rateAndComment.comment }
              onChange={ (event) => rateFunc(event, product) }
            />
          </label>
        </form>
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
  rateFunc: PropTypes.func.isRequired,
};

export default ProductDetails;
