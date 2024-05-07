import { AsideProps, Product } from '../types';

function Aside({ categories = [], selectCat }: AsideProps) {
  return (
    <aside>
      {
        categories.map(({ id, name }: Product) => {
          return (
            <label htmlFor={ id } key={ id } data-testid="category">
              { name }
              <input
                onChange={ () => selectCat(id) }
                type="radio"
                id={ id }
                name="radio-button-categories"
              />
            </label>
          );
        })
      }
    </aside>
  );
}

export default Aside;
