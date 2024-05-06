import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';

export default function ShoppingCart() {
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  return (
    <div>
      <h2>
        Carrinho de Compras&nbsp;
        <FaShoppingCart />
      </h2>
      <Link to="/"><TiArrowBack /></Link>
      {
        isCartEmpty
          ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )
          : <p>Shopping Cart</p>
      }
    </div>
  );
}
