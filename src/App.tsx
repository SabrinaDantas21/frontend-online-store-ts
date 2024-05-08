import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './__pages__/HomePage';
import ShoppingCart from './__pages__/ShoppingCart';
import DetailsPage from './__pages__/Details';
import Checkout from './__pages__/Checkout';
import { ProductsType } from './types';

function App() {
  const [cart, setCart] = useState<ProductsType[] | []>([]);

  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/details/:id" element={ <DetailsPage /> } />
      <Route
        path="/shopping-cart"
        element={ <ShoppingCart cart={ cart } setCart={ setCart } /> }
      />
      <Route path="/checkout" element={ <Checkout cart={ cart } /> } />
    </Routes>
  );
}

export default App;
