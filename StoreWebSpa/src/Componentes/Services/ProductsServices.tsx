import { AxiosResponse } from "axios";
import servicio from "./axiosServices";
import { Product } from "../../Models/Product";

export function GetProducts(): Promise<AxiosResponse<Product[]>> {
  return servicio.get("Products/");
} // before references product think if need a generic search

export function searchFor(search?: string): Promise<AxiosResponse<Product[]>> {
  return servicio.get("Products/SearchProduct/" + search);
}

/*
export function getFeatured(idUser: number, stars: string | number) {
  return servicio.get("Products/GetFeatured/" + idUser + "/" + stars);
} */

export function getFeatured() {
  return servicio.get("Products/Featured/");
}

export function getFavorites(userId: number) {
  return servicio.get("Favorite/Get/" + userId);
}
