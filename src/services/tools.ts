import { ProductsType } from '../types';

function addProductCart(prop: ProductsType) {
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

function removeProductCart(product: ProductsType) {
  const jsonString = localStorage.getItem('productsCart');
  const cart: ProductsType[] = jsonString ? JSON.parse(jsonString) : [];
  const productInCart = cart.find((product2) => product2.id === product.id);

  if (productInCart) {
    productInCart.selected_quantity = (productInCart.selected_quantity - 1) || 1;
  }
  localStorage.setItem('productsCart', JSON.stringify(cart));
}

export { addProductCart, removeProductCart };
