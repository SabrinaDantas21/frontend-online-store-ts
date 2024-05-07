import { ProductsType } from '../types';

function Card({ prop }:{ prop: ProductsType }) {
  return (
    <section data-testid="product">
      <h2>{ prop.title }</h2>
      <img src={ prop.thumbnail } alt={ prop.title } />
      <h4>{ prop.price }</h4>
    </section>
  );
}

export default Card;
