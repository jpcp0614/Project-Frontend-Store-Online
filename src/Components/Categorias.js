import React from 'react';
import PropTypes from 'prop-types';

class Categorias extends React.Component {
  render() {
    const { lista, handleClick } = this.props;
    return (
      <ul>
        {lista.map(({ id, name }) => (
          <li
            key={ id }
          >
            <label htmlFor={ id }>
              { name }
              <input
                data-testid="category"
                type="radio"
                name="category"
                id={ id }
                onClick={ (event) => handleClick(event, id) }
              />
            </label>
          </li>))}
      </ul>
    );
  }
}

Categorias.propTypes = {
  lista: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Categorias;
