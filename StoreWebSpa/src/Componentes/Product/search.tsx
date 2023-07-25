import React, { useState, useEffect } from "react";
import { searchFor } from "../Services/ProductsServices";
import ProductView from "./productview";
import Grid from "@mui/material/Grid";
import { Product } from "../../Models/Product";
import { useParams } from "react-router-dom";

const Search = (): JSX.Element => {
  let { search } = useParams();
  const [products, setProduct] = useState<Product[]>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = async (search?: string) => {
    const { data: products } = await searchFor(search);
    setProduct(products);
  };

  useEffect(() => {
    handleSearch(search);
  }, [handleSearch, search]);

  return (
    <>
      <h2>Results of the search</h2>
      <Grid container spacing={2}>
        {products.map((product: Product) => (
          <ProductView data={product} key={product.productId}></ProductView>
        ))}
      </Grid>
    </>
  );
};

export default Search;
