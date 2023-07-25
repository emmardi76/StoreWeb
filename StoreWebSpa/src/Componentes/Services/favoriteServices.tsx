import axios from "./axiosServices";
import { Favorite } from "../../Models/Favorite";

export function getFavorite(idUser: number) {
  return axios.get("Favorite/Get/" + idUser);
}

export function addFavorite(favorite: Favorite) {
  return axios.post("Favorite/Add/", favorite);
}

export function deleteFavorite(favorite: Favorite) {
  return axios.post("Favorite/Delete/", favorite);
}
