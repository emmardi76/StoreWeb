import React, { useState, useEffect } from "react";
import { getFeatured } from "../Services/ProductsServices";
import { Product } from "../../Models/Product";
import Grid from "@mui/material/Grid";
import ProductView from "./productview";

const Featured = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data: featured } = await getFeatured(); // (getUSer(),1001)
    console.log(featured);
    setProducts(featured);
  };

  return (
    <>
      <h2>Products more featured</h2>
      <Grid container spacing={2}>
        {products.map((product: Product) => (
          <ProductView data={product} key={product.productId}></ProductView>
        ))}
      </Grid>
    </>
  );
};

export default Featured;
