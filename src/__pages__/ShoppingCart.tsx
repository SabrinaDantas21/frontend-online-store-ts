import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Card from '../__components__/Card';
import { ProductsType } from '../types';

export default function ShoppingCart() {
  const [cart, setCart] = useState<ProductsType[] | []>([]);

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
        !cart.length
          ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )
          : cart.map((element, index) => (<Card
              key={ index }
              prop={ element }
          />
          ))
            }
    </div>
  );
}
