import { Link } from 'react-router-dom';
import { ProductsType } from '../types';

function Card({ prop }:{ prop: ProductsType }) {
  return (
    <Link
      data-testid="product-detail-link"
      to={ `/details/${prop.id}` }
    >
      <section data-testid="product">
        <h2>{ prop.title }</h2>
        <img src={ prop.thumbnail } alt={ prop.title } />
        <h4>{ prop.price }</h4>
      </section>
    </Link>
  );
}

export default Card;
