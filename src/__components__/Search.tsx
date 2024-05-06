import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <form>
      <input type="search" id="searchBar" placeholder="&#x1F50E;" />
      <Link
        to="/shopping-cart"
        data-testid="shopping-cart-button"
      >
        <FaShoppingCart />
      </Link>
      <button type="submit">Pesquisar</button>
    </form>
  );
}
