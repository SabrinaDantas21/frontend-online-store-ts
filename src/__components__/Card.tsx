import { useLocation } from 'react-router-dom';
import { ProductsType } from '../types';

function Card({ prop }:{ prop: ProductsType }) {
  const { title } = prop;
  function addProductCart() {
    const jsonString = localStorage.getItem('productsCart');
    const cart: ProductsType[] = jsonString ? JSON.parse(jsonString) : [];
    const selectedProductIndex = cart.findIndex((item) => item.id === prop.id);
    const productToAdd = { ...prop, selected_quantity: 1 };

    if (selectedProductIndex !== -1) {
      cart[selectedProductIndex].selected_quantity = (
        cart[selectedProductIndex].selected_quantity || 1) + 1;
    } else {
      cart.push(productToAdd);
    }

    localStorage.setItem('productsCart', JSON.stringify(cart));
  }

  const location = useLocation();

  return (
    <section data-testid="product">
      {
    location.pathname === '/'
      ? (
        <>
          <h2>{ prop.title }</h2>
          <img src={ prop.thumbnail } alt={ prop.title } />
          <h4>{ `Preço:R$${prop.price}` }</h4>
          <label htmlFor="add-to-cart">
            <input
              id="add-to-cart"
              type="checkbox"
              data-testid="product-add-to-cart"
              onChange={ addProductCart }
            />
            Adicionar ao carrinho
          </label>
        </>
      )
      : (
        <>
          <h2 data-testid="shopping-cart-product-name">{prop.title}</h2>
          <h4>{ `Preço:R$${prop.price}` }</h4>
          <h4 data-testid="shopping-cart-product-quantity">{prop.selected_quantity}</h4>
        </>
      )
  }
    </section>
  );
}

export default Card;
