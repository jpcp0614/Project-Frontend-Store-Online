import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Categorias from './Categorias';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';
import '../Busca.css';

class Busca extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      categoriesList: [],
      products: [],
      categoryFilter: 'CATEGORY_ID',
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchCategoriesAndSetOnState();
  }

  handleCategoryClick = (_event, id) => {
    this.setState(
      { categoryFilter: id },
      this.handleSubmit,
    );
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { input, categoryFilter } = this.state;
    const apiReturn = await getProductsFromCategoryAndQuery(categoryFilter, input);
    this.setState({
      products: apiReturn.results,
      loaded: true,
    });
  }

  async fetchCategoriesAndSetOnState() {
    const categories = await getCategories();
    this.setState({
      categoriesList: categories,
    });
  }

  render() {
    const { input, categoriesList, products, loaded } = this.state;
    const { cartFunc } = this.props;
    return (
      <div className="container">
        <div>
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <label htmlFor="input">
            <input
              data-testid="query-input"
              type="text"
              name="input"
              id="input"
              value={input}
              onChange={this.handleChange}
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={this.handleSubmit}
          >
            Buscar
          </button>
          <Categorias lista={categoriesList} handleClick={this.handleCategoryClick} />

          <Link
            to="/shopping-cart"
            data-testid="shopping-cart-button"
          >
            {' '}
            Ícone para carrinho de compras
          </Link>
        </div>
        <div>
          {loaded && <h2>Resultados:</h2>}
          {products.map((product) => (
            <ProductCard
              cartFunc={cartFunc}
              product={product}
              key={product.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

Busca.propTypes = {
  cartFunc: PropTypes.func.isRequired,
};

export default Busca;
