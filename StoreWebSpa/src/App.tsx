// import React from "react";
import "./App.css";
// import { Login, ShoppingCart, Star } from "@mui/icons-material";
// import { Routes, Route, Link } from "react-router-dom";
// import FavoritesView from "./Componentes/Favorite/favoritesview";
// import Featured from "./Componentes/Product/featured";
// import ProductsView from "./Componentes/Product/productsview";
// import Register from "./Componentes/Register/register";
// import { TextField, Icon, Button } from "@mui/material";
// import search from "./Componentes/Product/search";

import { Body } from "./Componentes/Body/body";
import Header from "./Componentes/Header/header";
import Footer from "./Componentes/Footer/footer";
import { Menu } from "./Componentes/Menu/menu";

//import { LoginProvider } from "./Componentes/Context/loginContext";
//import { FavoriteProvider } from "./Componentes/Context/favoriteContext";
//import { ShoppingCartProvider } from "./Componentes/Context/shoppingcartContext";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
        {/* <a className="App-link">HomePage</a> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <style>@import url('https://fonts.cdnfonts.com/css/roboto');</style>
      </header>
      <div>
        <Menu></Menu>
        <div className="App-body">
          <Body></Body>
        </div>
      </div>
      <footer className="App-footer">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default App;
