import React, { useContext } from "react";
import { FavoriteContext } from "../Context/favoriteContext";
import { ShoppingCartContext } from "../Context/shoppingcartContext";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Product } from "../../Models/Product";

export const FavoriteView = ({
  product,
}: {
  product: Product;
}): JSX.Element => {
  const { handleAddShoppingCart } = useContext(ShoppingCartContext);
  const { handleDeleteFavorite } = useContext(FavoriteContext);
  return (
    <>
      <Grid container item xs={12} sm={12} lg={12}>
        <Paper style={{ padding: 5, textAlign: "center", width: "100%" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <img
                    width={60}
                    alt=""
                    src={`https://localhost:5001/images/${product.routeImage}`}
                  />
                </td>
                <td>
                  <h2>{product.productName}</h2>
                  <Rating value={product.stars} readOnly></Rating>
                </td>
                <td>{product.description}</td>
                <td>{`Size: ${product.size}`}</td>
                <td>{`Price:  $ ${product.price}`}</td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (handleDeleteFavorite) handleDeleteFavorite(product);
                    }}
                  >
                    Delete
                  </Button>
                  &nbsp;
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      if (handleAddShoppingCart) handleAddShoppingCart(product);
                      if (handleDeleteFavorite) handleDeleteFavorite(product);
                    }}
                  >
                    Add to Shopping cart
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </Grid>
    </>
  );
};
