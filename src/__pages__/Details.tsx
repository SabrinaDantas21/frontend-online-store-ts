import { useParams, Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import InfoList from '../__components__/InfoList';
import { AttributeType, ProductsType } from '../types';
import { addProductCart } from '../services/tools';
import CartButton from '../__components__/CartButton';

type DetailsPageProp = {
  setCountItems: React.Dispatch<React.SetStateAction<number>>;
  countItems: number;
};

function DetailsPage({ setCountItems, countItems }: DetailsPageProp) {
  const [productDetails, setProductDetails] = useState<ProductsType>();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getProductById(id as string);
      setProductDetails(data);
    };

    getData();
  }, [id]);

  return (
    <div>
      <Link to="/"><TiArrowBack /></Link>
      <CartButton countItems={ countItems } />
      <button
        type="button"
        data-testid="product-detail-add-to-cart"
        onClick={ () => {
          if (productDetails) {
            const storageCart = addProductCart(productDetails);
            setCountItems(
              storageCart.reduce((prev, curr) => prev + curr.selected_quantity, 0),
            );
          }
        } }
      >
        Adicionar ao carrinho
      </button>
      <div>
        <h2 data-testid="product-detail-name">
          {productDetails?.title}
        </h2>
        <h3 data-testid="product-detail-price">
          R$
          {productDetails?.price}
        </h3>
        <div>
          <img
            data-testid="product-detail-image"
            src={ productDetails?.thumbnail }
            alt={ productDetails?.title }
          />
          <h3>Especificações técnicas</h3>
          <ul>
            { productDetails?.attributes.map((attribute: AttributeType) => {
              return (<InfoList
                key={ attribute.id }
                especification={ attribute.name }
                description={ attribute.value_name }
              />);
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
