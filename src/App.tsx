import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './__pages__/HomePage';
import ShoppingCart from './__pages__/ShoppingCart';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
    </Routes>
  );
}

export default App;
