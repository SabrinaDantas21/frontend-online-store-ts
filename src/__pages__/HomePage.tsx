import { useEffect, useState } from 'react';
import SearchBar from '../__components__/Search';
import { Product } from '../types';
import { getCategories } from '../services/api';
import Aside from '../__components__/Aside';
import Loading from '../__components__/Loading';

export default function HomePage() {
  const [categoriesList, setCategoriesList] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isListEmpty, setIsListEmpty] = useState(true);

  useEffect(() => {
    async function gettingData() {
      const data = await getCategories();
      setCategoriesList(data);
      setIsLoading(false);
    }
    gettingData();
  }, []);

  return (
    <>
      {
        isLoading
          ? <Loading />
          : <Aside categories={ categoriesList } />
      }
      <SearchBar />
      {isListEmpty
        ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
        : <p>Lista de produtos</p> }
    </>
  );
}
