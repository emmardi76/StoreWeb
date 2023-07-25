import React, { useContext } from "react";
//import Grid from "@mui/material/Grid";
import { FavoriteContext } from "../Context/favoriteContext";
import { Grid } from "@mui/material";
import { FavoriteView } from "./favoriteview";

const FavoritesView = (): JSX.Element => {
  const { itemsFav } = useContext(FavoriteContext);
  return (
    <>
      <h2>
        My favourites{" "}
        {itemsFav.length === 0 &&
          "(Don´t have favorite products in your list.)"}
      </h2>
      {
        <Grid container spacing={2}>
          {itemsFav.map((product) => {
            return (
              <FavoriteView
                product={product}
                key={product.productId}
              ></FavoriteView>
            );
          })}
        </Grid>
      }
    </>
  );
};

export default FavoritesView;
