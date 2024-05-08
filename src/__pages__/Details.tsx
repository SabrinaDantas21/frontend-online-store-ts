import { useParams, Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import InfoList from '../__components__/InfoList';
import { AttributeType, ProductsType } from '../types';

function DetailsPage() {
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
      <h1>Eu sou uma página de detalhes</h1>
      <Link
        to="/shopping-cart"
        data-testid="shopping-cart-button"
      >
        <FaShoppingCart />
      </Link>
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
