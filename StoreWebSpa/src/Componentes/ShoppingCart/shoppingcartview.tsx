import React, { useContext } from "react";
import ShoppingCartItem from "../ShoppingCart/shoppingcartitem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ShoppingCartContext } from "../Context/shoppingcartContext";
import { Product } from "../../Models/Product";
import { ShoppingCart } from "../../Models/ShoppingCart";

export interface ShoppingCartViewProps {
  items: ShoppingCart;
  otra: number;
}

const ShoppingCartView = () => {
  const { items, handleBuy } = useContext(ShoppingCartContext);
  return (
    <>
      <h2>
        My ShoppingCart{" "}
        {items.length === 0 ? (
          "(Haven´t  products in your shoppingcart)"
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              if (handleBuy) await handleBuy(items);
            }}
          >
            Buy now
          </Button>
        )}
      </h2>

      <Grid container spacing={2}>
        {items.map((product: Product) => (
          <ShoppingCartItem
            product={product}
            key={product.productId}
          ></ShoppingCartItem>
        ))}
      </Grid>
    </>
  );
};

export default ShoppingCartView;
