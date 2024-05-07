import { ProductsType } from '../types';

function Card({ prop }:{ prop: ProductsType }) {
  const { title } = prop;
  function addProductCart(event: React.ChangeEvent<HTMLInputElement>) {
    let newCart;
    const jsonString = localStorage.getItem('productsCart');
    const cart: string[] = jsonString ? JSON.parse(jsonString as string) : [];
    if (!event.target.checked) {
      newCart = cart.filter((item) => item !== title);
      localStorage.setItem('productsCart', JSON.stringify(newCart));
    } else {
      cart.push(title);
      localStorage.setItem('productsCart', JSON.stringify(cart));
    }
  }

  return (
    <section data-testid="product">
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
    </section>
  );
}

export default Card;
