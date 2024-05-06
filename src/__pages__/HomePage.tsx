import { useState } from 'react';
import SearchBar from '../__components__/Search';

export default function HomePage() {
  const [isListEmpty, setIsListEmpty] = useState(true);

  return (
    <>
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
