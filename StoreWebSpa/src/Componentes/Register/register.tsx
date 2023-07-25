import React, { useState } from "react";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { AccountCircle, MailOutline, VpnKey } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { register } from "../Services/userServices";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
//import sha1 from "sha1";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    token: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(user);
    await register(user);
    navigate({ pathname: "/" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    /*
    if (e.target.name === "nombre")
      setUsuario({ ...user, firstname: e.target.value });
    if (e.target.name === "apellido")
      setUsuario({ ...user, lastname: e.target.value });
    if (e.target.name === "email")
      setUsuario({ ...user, email: e.target.value });
    if (e.target.name === "password")
      setUsuario({ ...user, password: e.target.value }); */

    setUser({
      ...user,
      [e.target.name]: e.target.value,
      //e.target.name === "password" ? sha1(e.target.value) : e.target.value,
    });
    console.log([e.target.name], e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "grey" }}>Sale of roducts</h2>
        <h2>Regíster now</h2>
        <Icon color="action">
          <AccountCircle />
        </Icon>
        &nbsp;
        <TextField
          name="username"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Write your firstname"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action">
          <MailOutline />
        </Icon>
        &nbsp;
        <TextField
          name="email"
          onChange={(e) => handleChange(e)}
          type="email"
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
          name="password"
          type="password"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Write your password"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <hr />
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate({ pathname: "/" })}
        >
          Volver
        </Button>
        &nbsp;
        <Button type="submit" variant="contained" color="secondary">
          Registrate
        </Button>
      </form>
    </Container>
  );
};

export default Register;
