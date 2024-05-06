import { ProductsType } from '../types';

function Card({ pro }:{ prop: ProductsType }) {
  return (
    <section>
      <h2>{ prop.title }</h2>
      <img src={ prop.thumbnail } alt={ prop.title } />
      <h4>{ prop.price }</h4>
    </section>
  );
}

export default Card;
