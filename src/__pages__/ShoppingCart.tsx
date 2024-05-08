import { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Card from '../__components__/Card';
import { ProductsType, ShoppingCartPropsType } from '../types';
import {
  addProductCart,
  decrementProductCart,
  removeProductCart,
} from '../services/tools';

export default function ShoppingCart({ cart, setCart }: ShoppingCartPropsType) {
  useEffect(() => {
    const jsonString = localStorage.getItem('productsCart');
    const products = jsonString ? JSON.parse(jsonString) : [];
    setCart(products);
  }, []);

  const handleIncrementProduct = (prop: ProductsType) => {
    const newCart = addProductCart(prop);
    setCart(newCart);
  };

  const handleDecrementProduct = (prop: ProductsType) => {
    const newCart = decrementProductCart(prop);
    setCart(newCart);
  };

  const handleProductRemoval = (prop: ProductsType) => {
    const newCart = removeProductCart(prop);
    setCart(newCart);
  };

  return (
    <div>
      <h2>
        Carrinho de Compras&nbsp;
        <FaShoppingCart />
      </h2>
      <Link to="/"><TiArrowBack /></Link>
      <br />
      <Link to="/checkout" data-testid="checkout-products">Checkout</Link>
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
              addProductFunc={ () => handleIncrementProduct(element) }
              decrementProductFunc={ () => handleDecrementProduct(element) }
              removeProductFunc={ () => handleProductRemoval(element) }
          />
          ))
            }
    </div>
  );
}
