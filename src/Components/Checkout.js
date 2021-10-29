import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      cpf: '',
      email: '',
      telefone: '',
      cep: '',
      endereço: '',
      payment: '',
      formOk: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateForm = (event) => {
    event.preventDefault();
    const { fullname, cpf, email, telefone, cep, endereço, payment } = this.state;
    const isFormInvalid = fullname.length === 0
    || cpf.length === 0
    || email.length === 0
    || telefone.length === 0
    || cep.length === 0
    || endereço.length === 0
    || payment.length === 0;
    if (!isFormInvalid) {
      this.setState({
        formOk: true,
        fullname: '',
        cpf: '',
        email: '',
        telefone: '',
        cep: '',
        endereço: '',
        payment: '',
      });
    }
  }

  render() {
    const { fullname, cpf, email, telefone, cep, endereço, payment,
      formOk } = this.state;
    const { cartList } = this.props;
    return (
      <div>
        <section>
          <h1>Revise seus produtos</h1>
          {cartList.map((product) => (
            <div key={ product.id }>
              <h2>{product.title}</h2>
              <img src={ product.thumbnail } alt={ product.title } />
              <h3>{product.price}</h3>
            </div>
          ))}
          <h3>
            Valor total: R$
            {cartList.reduce((acc, product) => product.price + acc, 0).toFixed(2)}
          </h3>
        </section>

        <form>
          <label htmlFor="checkout-fullname">
            Nome completo:
            <input
              data-testid="checkout-fullname"
              type="text"
              name="fullname"
              id="checkout-fullname"
              value={ fullname }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="checkout-cpf">
            CPF
            <input
              data-testid="checkout-cpf"
              type="text"
              name="cpf"
              id="checkout-cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-email">
            Email
            <input
              data-testid="checkout-email"
              type="text"
              name="email"
              id="checkout-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-phone">
            Telefone
            <input
              data-testid="checkout-phone"
              type="text"
              name="telefone"
              id="checkout-phone"
              value={ telefone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cep">
            CEP
            <input
              data-testid="checkout-cep"
              type="text"
              name="cep"
              id="checkout-cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-address">
            Endereço
            <input
              data-testid="checkout-address"
              type="text"
              name="endereço"
              id="checkout-address"
              value={ endereço }
              onChange={ this.handleChange }
            />
          </label>

          <section>
            <p>Forma de pagamento:</p>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                name="payment"
                id="boleto"
                checked={ payment === 'boleto' }
                value="boleto"
                onChange={ this.handleChange }
              />
            </label>
            <p>Cartão de Crédito:</p>
            <label htmlFor="Visa">
              Visa
              <input
                type="radio"
                name="payment"
                id="Visa"
                checked={ payment === 'visa' }
                value="visa"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="MasterCard">
              MasterCard
              <input
                type="radio"
                name="payment"
                id="MasterCard"
                checked={ payment === 'masterCard' }
                value="masterCard"
                onChange={ this.handleChange }
              />
            </label>
            <p>Transferência bancária:</p>
            <label htmlFor="pix">
              Pix
              <input
                type="radio"
                name="payment"
                id="pix"
                checked={ payment === 'pix' }
                value="pix"
                onChange={ this.handleChange }
              />
            </label>
          </section>

          <button onClick={ this.validateForm } type="submit">Confirmar compra</button>
        </form>
        {formOk && <Redirect to="/" />}
      </div>
    );
  }
}

Checkout.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Checkout;
