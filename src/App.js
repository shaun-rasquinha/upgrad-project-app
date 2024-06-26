import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import ProductDetails from './components/Productdetails';


function App() {
  return (
    <Router>
      <NavBar />
        <Routes>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/products" element={<Products />} />
        <PrivateRoute path="/products/:id" element={<ProductDetails />} />
        <Route path="/" component={Home} />
        </Routes>
    </Router>
  );
}

export default App;
