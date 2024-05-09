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

  return cart;
}

function decrementProductCart(product: ProductsType) {
  const jsonString = localStorage.getItem('productsCart');
  const cart: ProductsType[] = jsonString ? JSON.parse(jsonString) : [];
  const productInCart = cart.find((product2) => product2.id === product.id);

  if (productInCart) {
    productInCart.selected_quantity = (productInCart.selected_quantity - 1) || 1;
  }
  localStorage.setItem('productsCart', JSON.stringify(cart));

  return cart;
}

function removeProductCart(product: ProductsType) {
  const jsonString = localStorage.getItem('productsCart');
  const cart: ProductsType[] = jsonString ? JSON.parse(jsonString) : [];
  const filteredCart = cart.filter((product2) => product2.id !== product.id);

  localStorage.setItem('productsCart', JSON.stringify(filteredCart));

  return filteredCart;
}

function validations(
  email: string,
  productRating: number,
  setIsItValid: (value: boolean) => void,
) {
  const validateEmail = () => {
    const validRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return validRegex.test(email);
  };

  if (!email || !validateEmail || productRating < 0) {
    setIsItValid(false);
  }
}

export { addProductCart, decrementProductCart, removeProductCart, validations };
