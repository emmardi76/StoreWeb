import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import { Apps, Close, Search, Star } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Menu = (): JSX.Element => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <nav>
      <TextField
        name="search"
        value={search}
        onChange={(e) => handleSearch(e)}
        placeholder="Seacrh by product or category ..."
        style={{ width: 300 }}
      />
      <Icon
        color="action"
        onClick={() => setSearch("")}
        style={{ cursor: "pointer" }}
      >
        <Close />
      </Icon>
      <Button
        variant="contained"
        onClick={() => {
          navigate({ pathname: `/search/${search}` });
        }}
      >
        <Icon color="action">
          <Search />
        </Icon>
        Search
      </Button>
      &nbsp;
      <Button
        variant="contained"
        onClick={() => {
          navigate({ pathname: "/featured" });
        }}
      >
        <Icon color="action">
          <Star />
        </Icon>
        Featured
      </Button>
      &nbsp;
      <Button
        variant="contained"
        onClick={() => {
          navigate({ pathname: "/search" });
        }}
      >
        <Icon color="action">
          <Apps />
        </Icon>
        All
      </Button>
      &nbsp;
      <Button
        variant="contained"
        onClick={() => {
          localStorage.clear();
          navigate({ pathname: "/" });
        }}
      >
        <Icon color="action">logout</Icon>Logout
      </Button>
    </nav>
  );
};
