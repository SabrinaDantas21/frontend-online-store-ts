import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FormEvent } from 'react';

export type SearchBarProp = {
  searched: string;
  handleType: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (value: FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
  searched,
  handleType,
  onSubmit,
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
      <Link
        to="/shopping-cart"
        data-testid="shopping-cart-button"
      >
        <FaShoppingCart />
      </Link>
      <button
        type="submit"
        data-testid="query-button"
      >
        Pesquisar
      </button>
    </form>
  );
}
