import { Product } from '../types';

function Aside({ categories = [] }: { categories?: Product[] }) {
  return (
    <aside>
      {
        categories.map(({ id, name }: Product) => {
          return (
            <label htmlFor={ id } key={ id } data-testid="category">
              { name }
              <input type="radio" id={ id } name="radio-button-categories" />
            </label>
          );
        })
      }
    </aside>
  );
}

export default Aside;
