import CheckoutForm from '../__components__/CheckoutForm';
import { ProductsType } from '../types';

export default function Checkout({ cart }: { cart: ProductsType[] }) {
  return (
    <div>
      <ul className="shopping-list">
        {
          cart.map((product) => {
            return (
              <div
                key={ product.id }
              >
                <h5>
                  { product.title }
                </h5>
                <h6>
                  Quantidade:&nbsp;
                  { product.selected_quantity }
                </h6>
              </div>
            );
          })
        }
      </ul>
      <CheckoutForm />
    </div>
  );
}
