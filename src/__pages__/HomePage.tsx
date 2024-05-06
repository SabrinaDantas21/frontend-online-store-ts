import { useEffect, useState } from 'react';
import SearchBar, { SearchBarProp } from '../__components__/Search';
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
  console.log(searched);

  // Chamar a função que faz a requisição
  useEffect(() => {
    // Função que pega os dados da API já processados e atualiza o status da variável "products"
    const productsRequisition = async (productName: string) => {
      const productsData = await getProductByQuery(productName);
      console.log(productsData);
      setProducts(productsData);
    };
    // Chama a função com o valor do input
    productsRequisition(searched);
    // Altera status da lista
    setIsListEmpty(false);
  }, []);

  return (
    <>
      <SearchBar searched={ searched } handleType={ handleType } />
      {isListEmpty
        ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
        : { // products.map((product) => {
          // return(
          // <Card prop={ product } />
          // )});
        }}

    </>
  );
}
