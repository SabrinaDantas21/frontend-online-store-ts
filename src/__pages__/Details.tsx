import { useParams, Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import InfoList from '../__components__/InfoList';
import { AttributeType, CommentType, ProductsType } from '../types';
import { addProductCart, validateEmail, addComment } from '../services/tools';
import CartButton from '../__components__/CartButton';
import Rating from '../__components__/Rating';

type DetailsPageProp = {
  setCountItems: React.Dispatch<React.SetStateAction<number>>;
  countItems: number;
};

function DetailsPage({ setCountItems, countItems }: DetailsPageProp) {
  const [productDetails, setProductDetails] = useState<ProductsType>();
  // estados dos campos do formulário
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number>(-1);
  const [isItValid, setIsItValid] = useState(true);
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);
  // id do elemento selecionado para exibição dos detalhes
  const { id } = useParams();
  // Função enviada por prop para alterar o estado do elemento
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  // Requisição de dados da API
  useEffect(() => {
    const getData = async () => {
      const data = await getProductById(id as string);
      // Altera os dados armazenados em productDetails
      setProductDetails(data);
    };

    getData();

    // Pega os dados do localStorage e atualiza a lista de comentários
    const jsonString = localStorage.getItem(id as string);
    const list: CommentType[] = jsonString ? JSON.parse(jsonString) : [];
    setCommentsList(list);
    setIsItValid(true);
  }, [id]);

  // Função que envia os dados do formulário
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Previne envio do formulário
    event.preventDefault();

    // validações
    if (!email || !validateEmail(email) || rating < 0) {
      return setIsItValid(false);
    }

    // dados para armazenar em localStorage
    const newComment: CommentType = {
      email,
      text,
      rating,
    };

    // adicionando dados à localStorage
    setCommentsList(addComment(newComment, id as string));
    setIsItValid(true);

    // limpando imputs
    setEmail('');
    setText('');
    setRating(-1);
  };
  return (
    <div>
      <Link to="/"><TiArrowBack /></Link>
      <CartButton countItems={ countItems } />
      <Link
        to="/shopping-cart"
        data-testid="shopping-cart-button"
      >
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
          { productDetails?.shipping.free_shipping === true
            ? (<h3 data-testid="free-shipping">Frete grátis</h3>) : '' }
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
        { !isItValid ? <span data-testid="error-msg">Campos inválidos</span> : <span />}
        <input
          data-testid="product-detail-email"
          type="email"
          name="email"
          onChange={ (event) => setEmail(event.target.value) }
          value={ email }
        />
        <div>
          <Rating rating={ rating } onRatingChange={ handleRatingChange } />
        </div>
        <textarea
          data-testid="product-detail-evaluation"
          name="comments"
          onChange={ (event) => setText(event.target.value) }
          value={ text }
        />
        <button
          data-testid="submit-review-btn"
          onClick={ handleSubmit }
        >
          Avaliar
        </button>
      </form>

      <section>
        { commentsList.map((comment, index) => {
          return (
            <div
              key={ index }
            >
              <h4 data-testid="review-card-email">{comment.email}</h4>
              <div data-testid="review-card-rating">
                { '★'.repeat((+comment.rating) + 1) }
              </div>
              <p data-testid="review-card-evaluation">{comment.text}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default DetailsPage;
