import React, { useEffect, useState } from "react";
import { GetProducts } from "../Services/ProductsServices";
import Grid from "@mui/material/Grid";
import { Product } from "../../Models/Product";
import ProductView from "./productview";

const ProductsView = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]); //inicialice state with empty array

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let userId = 0;
  const userIdString = localStorage.getItem("UserId");
  if (userIdString) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userId = parseInt(userIdString);
  }

  const loadProducts = async () => {
    const { data: products } = await GetProducts();
    setProducts(products);
  };
  return (
    <>
      <div>
        <h2>All Products</h2>
      </div>
      <Grid container spacing={2}>
        {products.map((product: Product) => {
          return (
            <ProductView data={product} key={product.productId}></ProductView>
          );
        })}
      </Grid>
    </>
  );
};

export default ProductsView;
