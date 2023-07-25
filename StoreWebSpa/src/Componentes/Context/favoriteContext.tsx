import React, { createContext, useState } from "react";
import {
  getFavorite,
  addFavorite,
  deleteFavorite,
} from "../Services/favoriteServices";
import { Product } from "../../Models/Product";

export interface FavoriteContextType {
  itemsFav: Product[];
  amountFav: number;
  handleGetFavorite?: () => Promise<void>;
  handleAddFavorite?: (product: Product) => Promise<void>;
  handleDeleteFavorite?: (product: Product) => Promise<void>;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  itemsFav: [],
  amountFav: 0,
});

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
// https://react.dev/reference/react/useContext
export const FavoriteProvider = (props: any) => {
  const getUserId = (): number => {
    const userIdString = localStorage.getItem("UserId");
    if (userIdString) return parseInt(userIdString);
    else return 0;
  };

  const [amountFav, setAmountFav] = useState(0);
  const [itemsFav, setItemsFav] = useState<Product[]>([]);
  const [userId] = useState<number>(getUserId());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetFavorite = async () => {
    const { data: favorite } = await getFavorite(userId);
    setItemsFav(favorite);
    setAmountFav(favorite.length);
  };

  const handleAddFavorite = async (product: Product) => {
    await addFavorite({
      userId: userId,
      productId: product.productId,
    });
    setAmountFav(amountFav + 1);
    setItemsFav([...itemsFav, product]);
  };

  const handleDeleteFavorite = async (product: Product) => {
    await deleteFavorite({
      userId: userId,
      productId: product.productId,
    });
    const newItems = itemsFav.filter(
      (item: Product) => item.productId !== product.productId
    );
    setItemsFav(newItems);
    setAmountFav(amountFav - 1);
  };

  // useEffect(() => {
  //   userId && handleGetFavorite();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userId]);

  return (
    <FavoriteContext.Provider
      value={{
        itemsFav,
        amountFav,
        handleGetFavorite,
        handleAddFavorite,
        handleDeleteFavorite,
      }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
};
