import axios from "./axiosServices";
import { User } from "../../Models/User";
import { LoginUser } from "../../Models/LoginUser";

export function register(user: User) {
  return axios.post("User/", user);
}

export function login(login: LoginUser) {
  const response = axios.post("Users/LoginUser", login);
  return response;
}

export function getUser(): number {
  let userId = 0;
  const userIdString = localStorage.getItem("UserId");
  if (userIdString) {
    userId = parseInt(userIdString);
  }
  return userId;
}
