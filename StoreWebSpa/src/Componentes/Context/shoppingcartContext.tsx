import React, { createContext, useState } from "react";
import { buy } from "../Services/shoppingcartServices";
import { Product } from "../../Models/Product";

interface ShoppinCartContextContent {
  items: Product[];
  setItems?: React.Dispatch<React.SetStateAction<Product[]>>;
  amount: number;
  setAmount?: React.Dispatch<React.SetStateAction<number>>;
  handleAddShoppingCart?: (product: Product) => void;
  handleDeleteShoppingCart?: (product: Product) => Promise<void>;
  handleBuy?: (products: Product[]) => Promise<void>;
}

// items,
//         setItems,
//         amount,
//         setAmount,
//         handleAddShoppingCart,
//         handleDeleteShoppingCart,
//         handleBuy,

export const ShoppingCartContext = createContext<ShoppinCartContextContent>({
  items: [],
  amount: 0,
});

export const ShoppingCartProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) => {
  //const shoppingCartContext = useContext(ShoppingCartContext);
  const [amount, setAmount] = useState<number>(0);
  const [items, setItems] = useState<Product[]>([]);
  let userId = 0;
  const userIdString = localStorage.getItem("UserId");
  if (userIdString) {
    userId = parseInt(userIdString);
  }
  const handleBuy = async (products: Product[]) => {
    const shoppingcart = products.map((product: Product) => ({
      userId: userId,
      productId: product.productId,
    }));

    const response = await buy(shoppingcart);
    if (response.status === 400) {
      alert(response.data);
    }

    handleDeleteShoppingCartAll();
  };

  const handleAddShoppingCart = async (product: Product) => {
    setAmount(amount + 1);
    setItems([...items, product]);
  };

  const handleDeleteShoppingCart = async (product: Product) => {
    const newItems: Product[] = items.filter(
      (item: Product) => item.productId !== product.productId
    );

    setItems(newItems);
    setAmount(amount - 1);
  };

  const handleDeleteShoppingCartAll = () => {
    setItems([]);
    setAmount(0);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        items,
        setItems,
        amount,
        setAmount,
        handleAddShoppingCart,
        handleDeleteShoppingCart,
        handleBuy,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
};
