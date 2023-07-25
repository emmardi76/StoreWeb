import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ShoppingCartContext } from "../Context/shoppingcartContext";
import { Product } from "../../Models/Product";

interface ShoppingCartItemProps {
  product: Product;
}
//const ShoppingCartItem = (product: Product) => {
const ShoppingCartItem = ({ product }: ShoppingCartItemProps): JSX.Element => {
  const { handleDeleteShoppingCart } = useContext(ShoppingCartContext);

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
                  <Rating value={product.stars} readOnly />
                </td>
                <td>{product.description}</td>
                <td>{`Size: ${product.size}`}</td>
                <td>{`Price:  $ ${product.price}`}</td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (handleDeleteShoppingCart!)
                        handleDeleteShoppingCart(product);
                    }}
                  >
                    Remove
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

export default ShoppingCartItem;
