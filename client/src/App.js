//import logo from './logo.svg';
import './App.css';
import React from "react";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import ShoppingCart from "./pages/ShoppingCart";
import Footer from "./components/Footer";
import AllProducts from "./pages/AllProducts";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import TempProducts from "./pages/test/TempProducts";
import TempOrders from "./pages/test/TempOrders";
import TempCart from "./pages/test/TempCart";
import TempRecipes from "./pages/test/TempRecipes";
import TempLogin from "./pages/test/TempLogin";
import TempComment from "./pages/test/TempComments";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div id="app-content">
          <Nav />
          <Jumbotron />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/admin" component={Admin} />
            <Route path="/account" component={Account} />
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/products" component={AllProducts} />
          </Switch>
          < Footer />

      </div>
    </Router>
  );
}

export default App;

