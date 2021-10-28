import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Busca from './Components/Busca';
import Checkout from './Components/Checkout';
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
    this.setState((prev) => ({
      cartList: [...prev.cartList, product],
    }));
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
          <Route exact path="/" render={ () => <Busca cartFunc={ this.addToCart } /> } />
          <Route
            path="/shopping-cart"
            render={ () => <ShoppingCart remove={ this.removeItem } cart={ cartList } /> }
          />
          <Route
            path="/product-details/:id"
            render={ (routeProps) => (<ProductDetails
              { ...routeProps }
              cartFunc={ this.addToCart }
            />) }
          />
          <Route
            path="/checkout"
            render={ () => (<Checkout
              cartList={ cartList }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
