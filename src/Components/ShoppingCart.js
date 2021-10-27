import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

class ShoppingCart extends React.Component {
  checkIfCartIsEmpty = () => {
    const { cart } = this.props;

    if (cart.length > 0) {
      return false;
    }
    return true;
  };

  render() {
    const { cart, remove } = this.props;
    const emptyMessage = (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
    const cartMap = cart.map((item) => (
      <CartItem remove={ remove } key={ item.id } product={ item } />
    ));

    const totalPrice = cart.reduce((acc, product) => product.price + acc, 0);

    return (
      <div>
        { this.checkIfCartIsEmpty() ? emptyMessage : cartMap }
        { `total = ${totalPrice}` }

        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
};

export default ShoppingCart;
