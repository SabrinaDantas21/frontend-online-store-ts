import { useEffect, FormEvent, useState } from 'react';
import SearchBar from '../__components__/Search';
import {
  getProductByQuery,
  getCategories,
  getProductByCategoryId,
} from '../services/api';
import Card from '../__components__/Card';
import { ProductsType, Product } from '../types';
import Aside from '../__components__/Aside';
import Loading from '../__components__/Loading';

export default function HomePage() {
  const [categoriesList, setCategoriesList] = useState<Product[]>();
  const [isCatListLoading, setIsCatListLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(false);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    async function gettingData() {
      const data = await getCategories();
      setCategoriesList(data);
      setIsCatListLoading(false);
    }
    gettingData();
  }, []);

  const handleCatChange = async (id: string) => {
    setIsListLoading(true);
    const data = await getProductByCategoryId(id);
    setProducts(data);
    setIsListLoading(false);
  };

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsListLoading(true);
    setProducts(await getProductByQuery(query));
    setSearched(true);
    setIsListLoading(false);
  };

  return (
    <>
      {
        isCatListLoading
          ? <Loading />
          : <Aside selectCat={ handleCatChange } categories={ categoriesList } />
      }
      <SearchBar
        searched={ query }
        handleType={ handleType }
        onSubmit={ handleSubmit }
      />
      { !products.length && !searched
        && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
      { !products.length && searched && <p>Nenhum produto foi encontrado.</p>}
      {
        isListLoading
          ? <Loading />
          : (
            products.map((product) => (
              <Card
                key={ product.id }
                prop={ product }
              />
            )))
      }
    </>
  );
}
