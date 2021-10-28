import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Busca from './Components/Busca';
import ProductDetails from './Components/ProductDetails';
import ShoppingCart from './Components/ShoppingCart';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cartList: [],
    };
  }

  addToCart = (product) => {
    const { cartList } = this.state;
    const productIsAlreadyOnCart = cartList.find((cartItem) => (
      cartItem.id === product.id));
    const indexOfProduct = cartList.indexOf(productIsAlreadyOnCart);

    if (indexOfProduct >= 0) {
      this.increaseQuantity(product);
    } else {
      product.quantidadeNoCarrinho = 1;
      this.setState((prev) => ({
        cartList: [...prev.cartList, product],
      }));
    }
  };

  increaseQuantity = (product) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.map((item) => {
      const itemToUpdate = item;
      if (itemToUpdate.id === product.id) {
        itemToUpdate.quantidadeNoCarrinho += 1;
      }
      return itemToUpdate;
    });
    this.setState({
      cartList: updatedCartList,
    });
  };

  decreaseQuantity = (product) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.map((item) => {
      const itemToUpdate = item;
      if (itemToUpdate.id === product.id
        && itemToUpdate.quantidadeNoCarrinho > 1) {
        itemToUpdate.quantidadeNoCarrinho -= 1;
      }
      return itemToUpdate;
    });
    this.setState({
      cartList: updatedCartList,
    });
  };

  removeItem = ({ id }) => {
    const { cartList } = this.state;
    const newArr = cartList.filter((item) => item.id !== id);

    this.setState({
      cartList: newArr,
    });
  };

  render() {
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Busca
                cartFunc={ this.addToCart }
              />) }
          />
          <Route
            path="/shopping-cart"
            render={ () => (<ShoppingCart
              remove={ this.removeItem }
              cart={ cartList }
              funcToIncrease={ this.increaseQuantity }
              funcToDecrease={ this.decreaseQuantity }
            />) }
          />
          <Route
            path="/product-details/:id"
            render={ (routeProps) => (<ProductDetails
              { ...routeProps }
              cartFunc={ this.addToCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
