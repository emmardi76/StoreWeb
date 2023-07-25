import React, { useEffect, useState, useRef, useContext } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Rating from "@mui/material/Rating";
import { Favorite } from "@mui/icons-material";
import { FavoriteContext } from "../Context/favoriteContext";
import { ShoppingCartContext } from "../Context/shoppingcartContext";
import { Product } from "../../Models/Product";

export interface ProductViewProps {
  data: Product;
  isfavorite?: boolean;
  inshoppingcart?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProductView = ({
  data,
  isfavorite,
  inshoppingcart,
}: ProductViewProps): JSX.Element => {
  const { handleAddShoppingCart, handleBuy } = useContext(ShoppingCartContext);
  const { handleAddFavorite, handleDeleteFavorite } =
    useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(isfavorite ? true : false);
  const [buttons, setButtons] = useState<boolean>(false);
  const favorite: any = useRef();

  useEffect(() => {
    setButtons(inshoppingcart ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFavorite = (product: Product) => {
    //console.log(product);
    if (!isFavorite) {
      if (handleAddFavorite) handleAddFavorite(product);
      if (favorite.current)
        favorite.current.className =
          "material-icons MuiIcon-root MuiIcon-colorSecondary";
    } else {
      if (handleDeleteFavorite) handleDeleteFavorite(product);
      if (favorite.current)
        favorite.current.className =
          "material-icons MuiIcon-root MuiIcon-colorDisabled";
    }
    setIsFavorite(!isFavorite);
  };
  return (
    <>
      <Grid container item xs={12} sm={4} lg={3}>
        <Paper style={{ padding: 5, textAlign: "center" }}>
          <h2>{data.productName}</h2>
          <Icon
            color={isfavorite ? "secondary" : "disabled"}
            style={{ cursor: "pointer" }}
            ref={favorite.current}
            onClick={() => setFavorite(data)}
          >
            <Favorite />
          </Icon>
          <div>
            <img
              width={200}
              alt=""
              src={`https://localhost:5001/images/${data.routeImage}`}
            />
          </div>
          <div>
            <Rating value={data.stars} readOnly />
          </div>
          <br />
          <div>{data.productName}</div>
          <br />
          <div>{data.description}</div>
          <br />
          <div>{`Size: ${data.size}`}</div>
          <br />
          <div>
            <b>{`Price: $ ${data.price}`}</b>
          </div>
          <br />
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={buttons}
              onClick={async () => {
                if (handleBuy) {
                  setButtons(true);
                  await handleBuy([data]);
                  setButtons(false);
                }
              }}
            >
              Buy
            </Button>
            &nbsp;
            <Button
              variant="outlined"
              color="secondary"
              disabled={buttons}
              onClick={() => {
                setButtons(true);
                if (handleAddShoppingCart) handleAddShoppingCart(data);
                setButtons(false);
              }}
            >
              Add to ShoppingCart
            </Button>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default ProductView;
