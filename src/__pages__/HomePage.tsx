import { FormEvent, useState } from 'react';
import SearchBar from '../__components__/Search';
import { getProductByQuery } from '../services/api';
import Card from '../__components__/Card';
import { ProductsType } from '../types';

export default function HomePage() {
  const [isListEmpty, setIsListEmpty] = useState(true);
  const [products, setProducts] = useState<ProductsType[] | null>([]);
  const [searched, setSearched] = useState('');

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Previne evento de limpar os inputs
    event.preventDefault();
    // Função que pega os dados da API já processados e atualiza o status da variável "products"
    setProducts(await getProductByQuery(searched));
    // Altera o estado da mensagem inicial
    setIsListEmpty(false);
  };

  return (
    <>
      <SearchBar
        searched={ searched }
        handleType={ handleType }
        onSubmit={ handleSubmit }
      />
      { isListEmpty
        && <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>}
      { (!products || products.length === 0) ? (
        <p>Nenhum produto foi encontrado.</p>
      ) : (
        products.map((product) => (
          <Card
            key={ product.id }
            prop={ product }
          />
        ))
      )}
    </>
  );
}
