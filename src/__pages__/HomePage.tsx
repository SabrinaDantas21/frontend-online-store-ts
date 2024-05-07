import { useEffect, FormEvent, useState } from 'react';
import SearchBar from '../__components__/Search';
import { getProductByQuery, getCategories } from '../services/api';
import Card from '../__components__/Card';
import { ProductsType, Product } from '../types';
import Aside from '../__components__/Aside';
import Loading from '../__components__/Loading';

export default function HomePage() {
  const [categoriesList, setCategoriesList] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function gettingData() {
      const data = await getCategories();
      setCategoriesList(data);
      setIsLoading(false);
    }
    gettingData();
  }, []);
  
  function handleShowSearch() {
    if (!products || products.length === 0) {
      return <p>Nenhum produto foi encontrado.</p>;
    }
    return products.map((product) => (
      <Card
        key={ product.id }
        prop={ product }
      />
    ));
  }

  return (
    <>
      {
        isLoading
          ? <Loading />
          : <Aside categories={ categoriesList } />
      }
      <SearchBar
        searched={ searched }
        handleType={ handleType }
        onSubmit={ handleSubmit }
      />
      { isListEmpty
        ? (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
        : handleShowSearch()}
    </>
  );
}
