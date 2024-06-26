import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
