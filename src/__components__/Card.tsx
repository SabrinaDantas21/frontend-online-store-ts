import { useLocation, Link } from 'react-router-dom';

import { IoRemoveOutline, IoAddOutline } from 'react-icons/io5';
import { useState } from 'react';
import { ProductsType } from '../types';
import { addProductCart, removeProductCart, getItemQuantity } from '../services/tools';

function Card({ prop }:{ prop: ProductsType }) {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();

  const handleDecrement = () => {
    removeProductCart(prop);
    const productQuantity = getItemQuantity(prop);
    if (productQuantity) setQuantity(productQuantity);
  };

  const handleIncrement = () => {
    addProductCart(prop);
    const productQuantity = getItemQuantity(prop);
    if (productQuantity) setQuantity(productQuantity);
  };

  return (
    <section data-testid="product">
      {
        location.pathname === '/'
          ? (
            <>
              <Link
                data-testid="product-detail-link"
                to={ `/details/${prop.id}` }
              >
                <h2>{ prop.title }</h2>
                <img src={ prop.thumbnail } alt={ prop.title } />
                <h4>{ `Preço:R$${prop.price}` }</h4>
              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => addProductCart(prop) }
              >
                Adicionar ao carrinho
              </button>
            </>
          )
          : (
            <>
              <h2 data-testid="shopping-cart-product-name">{prop.title}</h2>
              <h4>{ `Preço:R$${prop.price}` }</h4>
              <button
                data-testid="product-decrease-quantity"
                onClick={ handleDecrement }
              >
                <IoRemoveOutline />
              </button>
              <h4
                data-testid="shopping-cart-product-quantity"
              >
                {quantity}
              </h4>
              <button
                data-testid="product-increase-quantity"
                onClick={ handleIncrement }
              >
                <IoAddOutline />
              </button>
            </>
          )
      }
    </section>

  );
}

export default Card;
