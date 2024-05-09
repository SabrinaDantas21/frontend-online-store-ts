import { useParams, Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import InfoList from '../__components__/InfoList';
import { AttributeType, ProductsType } from '../types';
import { addProductCart, validateEmail } from '../services/tools';
import Rating from '../__components__/Rating';

function DetailsPage() {
  const [productDetails, setProductDetails] = useState<ProductsType>();
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [productRating, setProductRating] = useState<number>(-1);
  const { id } = useParams();

  const handleRatingChange = (newRating: number) => {
    setProductRating(newRating);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getProductById(id as string);
      setProductDetails(data);
    };

    getData();
  }, [id]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // validações
    if (!email || !validateEmail || productRating < 0) {
      return (
        <span>Campos inválidos</span>
      );
    }
    // limpando imputs
    setComments('');
    setProductRating(-1);
    setEmail('');
  };

  return (
    <div>
      <Link to="/"><TiArrowBack /></Link>
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
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => { if (productDetails) addProductCart(productDetails); } }
        >
          Adicionar ao carrinho
        </button>
      </div>
      <h2>Avaliações</h2>
      <form>
        <input
          data-testid="product-detail-email"
          type="email"
          name="email"
          onChange={ (event) => setEmail(event.target.value) }
          value={ email }
        />
        <div>
          <Rating rating={ productRating } onRatingChange={ handleRatingChange } />
        </div>
        <textarea
          data-testid="product-detail-evaluation"
          name="comments"
          onChange={ (event) => setComments(event.target.value) }
          value={ comments }
        />
        <span>{ }</span>
        <button
          data-testid="submit-review-btn"
          onClick={ handleSubmit }
        >
          Avaliar
        </button>
      </form>

      <section>
        <div>
          <h4 data-testid="review-card-email">Meu melhor e-mail</h4>
          <span data-testid="review-card-rating">Minhas estrelas</span>
          <p data-testid="review-card-evaluation">Meus comentários</p>
        </div>
      </section>
    </div>
  );
}

export default DetailsPage;
