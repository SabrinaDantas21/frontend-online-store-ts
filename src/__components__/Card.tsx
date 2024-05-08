import { useLocation, Link } from 'react-router-dom';

import { IoRemoveOutline, IoAddOutline } from 'react-icons/io5';
import { CardInfoPropsType } from '../types';

function Card({
  prop,
  addProductFunc,
  decrementProductFunc,
  removeProductFunc,
}:CardInfoPropsType) {
  const location = useLocation();

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
                onClick={ () => addProductFunc(prop) }
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
                onClick={ () => decrementProductFunc && decrementProductFunc(prop) }
              >
                <IoRemoveOutline />
              </button>
              <h4
                data-testid="shopping-cart-product-quantity"
              >
                {prop.selected_quantity}
              </h4>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => addProductFunc(prop) }
              >
                <IoAddOutline />
              </button>
              <button
                data-testid="remove-product"
                onClick={ () => removeProductFunc && removeProductFunc(prop) }
              >
                Remover Produto
              </button>
            </>
          )
      }
    </section>

  );
}

export default Card;
