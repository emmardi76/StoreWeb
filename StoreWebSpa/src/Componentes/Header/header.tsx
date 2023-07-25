import React, { useContext } from "react";
import { ShoppingCartContext } from "../Context/shoppingcartContext";
import Icon from "@mui/material/Icon";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { FavoriteContext } from "../Context/favoriteContext";

const Header = () => {
  const { amountFav } = useContext(FavoriteContext);
  const { amount } = useContext(ShoppingCartContext);

  return (
    <header>
      <h1>StoreWebApp</h1>
      <br />
      <Link to="/favorites">
        <Icon color="action" fontSize="large">
          <Favorite />
        </Icon>
      </Link>
      <Badge
        /*change here the value to show how see the badget in the header*/
        badgeContent={amountFav}
        color="secondary"
      ></Badge>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/shoppingcart">
        <Icon color="action" fontSize="large">
          <ShoppingCart />
        </Icon>
      </Link>
      <Badge badgeContent={amount} color="primary"></Badge>
    </header>
  );
};

export default Header;
