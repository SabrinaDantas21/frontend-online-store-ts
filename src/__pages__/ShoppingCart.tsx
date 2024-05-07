import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Card from '../__components__/Card';

export default function ShoppingCart() {
  const [cart, setCart] = useState<string[] | []>([]);

  useEffect(() => {
    const jsonString = localStorage.getItem('productsCart');
    const products = jsonString ? JSON.parse(jsonString) : [];
    setCart(products);
  }, []);

  return (
    <div>
      <h2>
        Carrinho de Compras&nbsp;
        <FaShoppingCart />
      </h2>
      <Link to="/"><TiArrowBack /></Link>
      {
        !cart
          ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )
          : <h2>produtos no carrinho</h2>
}
    </div>
  );
}
