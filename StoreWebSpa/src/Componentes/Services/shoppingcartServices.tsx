import axios from "./axiosServices";
import { ShoppingCart } from "../../Models/ShoppingCart";
import { AxiosResponse } from "axios";

export function buy(ShoppingCart: ShoppingCart[]): Promise<AxiosResponse> {
  return axios.post("ShoppingCart/Buy/", ShoppingCart);
}
