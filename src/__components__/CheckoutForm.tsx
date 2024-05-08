import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../services/tools';

export default function CheckoutForm() {
  const navigate = useNavigate();

  const [invalidForm, setInvalidForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    cep: '',
    address: '',
    payMethod: '',
  });

  const handleFormChange = (id: string, value: string) => {
    const newValue = value;
    let currentFormObject = formData;
    if (id === 'ticket' || id === 'visa' || id === 'master' || id === 'elo') {
      currentFormObject = { ...formData, payMethod: id };
    } else {
      currentFormObject = { ...formData, [id]: newValue };
    }
    setFormData(currentFormObject);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { fullName, email, cpf, phoneNumber, cep, address, payMethod } = formData;
    if (fullName === ''
      || email === ''
      || cpf === ''
      || phoneNumber === ''
      || cep === ''
      || address === ''
      || payMethod === ''
    ) {
      setInvalidForm(true);
    } else {
      setInvalidForm(false);
      clearCart();
      navigate('/');
    }
  };

  return (
    <form
      onSubmit={ handleSubmit }
    >
      <label htmlFor="fullName">Nome completo:</label>
      <input
        type="text"
        data-testid="checkout-fullname"
        id="fullName"
        onChange={ ({ target }) => handleFormChange(target.id, target.value) }
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        data-testid="checkout-email"
        id="email"
        onChange={ ({ target }) => handleFormChange(target.id, target.value) }
      />

      <label htmlFor="cpf">CPF:</label>
      <input
        type="text"
        data-testid="checkout-cpf"
        id="cpf"
        onChange={ ({ target }) => handleFormChange(target.id, target.value) }
      />

      <label htmlFor="phoneNumber">Telefone:</label>
      <input
        type="text"
        data-testid="checkout-phone"
        id="phoneNumber"
        onChange={ ({ target }) => handleFormChange(target.id, target.value) }
      />

      <label htmlFor="cep">CEP:</label>
      <input
        type="text"
        data-testid="checkout-cep"
        id="cep"
        onChange={ ({ target }) => handleFormChange(target.id, target.value) }
      />

      <label htmlFor="address">Endereço:</label>
      <input
        type="text"
        data-testid="checkout-address"
        id="address"
        onChange={ ({ target }) => handleFormChange(target.id, target.value) }
      />
      <hr />
      <label htmlFor="payment">Método de pagamento:</label>
      <fieldset id="payment">
        <label htmlFor="ticket">
          Boleto:
          <input
            data-testid="ticket-payment"
            type="radio"
            name="paymentMethod"
            id="ticket"
            onChange={ ({ target }) => handleFormChange(target.id, target.value) }
          />
        </label>
        <br />
        <label htmlFor="visa">
          VISA:
          <input
            data-testid="visa-payment"
            type="radio"
            name="paymentMethod"
            id="visa"
            onChange={ ({ target }) => handleFormChange(target.id, target.value) }
          />
        </label>
        <br />
        <label htmlFor="master">
          MasterCard:
          <input
            data-testid="master-payment"
            type="radio"
            name="paymentMethod"
            id="master"
            onChange={ ({ target }) => handleFormChange(target.id, target.value) }
          />
        </label>
        <br />
        <label htmlFor="elo">
          ELO:
          <input
            data-testid="elo-payment"
            type="radio"
            name="paymentMethod"
            id="elo"
            onChange={ ({ target }) => handleFormChange(target.id, target.value) }
          />
        </label>
      </fieldset>
      <button data-testid="checkout-btn" type="submit">
        Finalizar compra
      </button>
      { invalidForm && <h3 data-testid="error-msg">Campos inválidos</h3> }
    </form>
  );
}
