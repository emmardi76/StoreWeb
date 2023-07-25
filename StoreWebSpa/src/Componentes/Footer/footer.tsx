import React from "react";
import Icon from "@mui/material/Icon";
import { Email, Facebook } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer>
      <p>StoreWebApp - Copyright</p>
      <Icon>
        <Email />
      </Icon>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Icon>
        <Facebook />
      </Icon>
    </footer>
  );
};

export default Footer;
