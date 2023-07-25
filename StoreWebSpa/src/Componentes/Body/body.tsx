import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductsView from "../Product/productsview";
import Login from "../Login/login";

import Featured from "../Product/featured";
import Register from "../Register/register";
import Search from "../Product/search";
import FavoritesView from "../Favorite/favoritesview";
import ShoppingCartView from "../ShoppingCart/shoppingcartview";

export const Body = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<ProductsView />} />
      <Route path="/favorites" element={<FavoritesView />} />
      <Route path="/shoppingcart" element={<ShoppingCartView />} />
      <Route path="/featured" element={<Featured />} />
      <Route path="/search/:search" element={<Search />} />
      <Route path="/search/" element={<ProductsView />} />
      <Route path="/register" element={<Register />} />
      {/*<Route spath="/buscar/" exact component={Peliculas}></Route>*/}
    </Routes>
  );
};
