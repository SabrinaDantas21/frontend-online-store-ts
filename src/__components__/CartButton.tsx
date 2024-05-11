import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function CartButton({ countItems }: { countItems: number }) {
  return (
    <Link
      to="/shopping-cart"
      data-testid="shopping-cart-button"
    >
      <FaShoppingCart />
      <span data-testid="shopping-cart-size">
        {' '}
        {countItems}
      </span>
    </Link>
  );
}

export default CartButton;
