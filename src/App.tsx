import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './__pages__/HomePage';
import ShoppingCart from './__pages__/ShoppingCart';
import DetailsPage from './__pages__/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/details/:id" element={ <DetailsPage /> } />
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
    </Routes>
  );
}

export default App;
