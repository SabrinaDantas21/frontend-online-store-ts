import CartButton from './CartButton';
import { SearchBarProp } from '../types';

export default function SearchBar({
  searched,
  handleType,
  onSubmit,
  countItems,
}: SearchBarProp) {
  return (
    <form onSubmit={ onSubmit }>
      <input
        data-testid="query-input"
        type="search"
        id="searchBar"
        placeholder="&#x1F50E;"
        value={ searched }
        onChange={ handleType }
      />
      <CartButton countItems={ countItems } />
      <button
        type="submit"
        data-testid="query-button"
      >
        Pesquisar
      </button>
    </form>
  );
}
