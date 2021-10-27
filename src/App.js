import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
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
    // const item = {
    //   product,
    //   quant: 1,
    // }

    this.setState((prev) => ({
      cartList: [...prev.cartList, product],
    }));
  };

  render() {
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => <Busca cartFunc={ this.addToCart } /> } />
          <Route
            path="/shopping-cart"
            render={ () => <ShoppingCart cart={ cartList } /> }
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
