import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//import sha1 from "sha1";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { MailOutline, VpnKey } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { login } from "../Services/userServices";
import { LoginContext } from "../Context/loginContext";
import { FavoriteContext } from "../Context/favoriteContext";

const Login = (): JSX.Element => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const { handleLogin } = useContext(LoginContext);
  const { handleGetFavorite } = useContext(FavoriteContext);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const loginResult = await login(user);
    if (loginResult.status === 200) {
      const token = loginResult.data.token;
      const claims = token.split(".")[1];
      var decodedValue = JSON.parse(window.atob(claims));
      handleLogin(decodedValue.UserId, token);
      if (handleGetFavorite) handleGetFavorite();
      navigate({ pathname: "/favorites" });
    } else {
      setMsg("The credentials aren´t correct, try again.");
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      //e.target.name === "password" ? sha1(e.target.value) : e.target.value,
    });
    console.log(user);
  };

  const navigate = useNavigate();

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "grey" }}>Sale of products</h2>
        <h2>Welcome</h2>
        <Icon color="action">
          <MailOutline />
        </Icon>
        &nbsp;
        <TextField
          type="email"
          name="Email"
          onChange={(e: { target: { name: string; value: string } }) =>
            handleChange(e)
          }
          required
          placeholder="Write your email"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action">
          <VpnKey />
        </Icon>
        &nbsp;
        <TextField
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Write your password"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <h4 style={{ color: "red" }}>{msg}</h4>
        <hr />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>{" "}
        &nbsp;
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate({ pathname: "/register" })}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Login;
