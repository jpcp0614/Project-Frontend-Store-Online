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
      products: [],
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

  getProducts = (products) => {
    this.setState({ products });
  }

  setRateOnState = (event, product) => {
    const { products } = this.state;
    const initiatedProducts = products.map((item) => {
      if (!item.rateAndComment) {
        item.rateAndComment = {
          rate: '',
          comment: '',
        };
      } else if (item.rateAndComment && item.id === product.id) {
        if (event.target.type === 'radio') {
          item.rateAndComment.rate = event.target.value;
        } else if (event.target.type === 'textarea') {
          item.rateAndComment.comment = event.target.value;
        }
      }
      return item;
    });
    this.setState({
      products: initiatedProducts,
    });
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
      products: [],
    });
  };

  render() {
    const { cartList, products } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Busca
                cartFunc={ this.addToCart }
                getProducts={ this.getProducts }
                products={ products }
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
              rateFunc={ this.setRateOnState }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
