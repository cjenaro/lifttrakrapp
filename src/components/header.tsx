import * as React from "react";
import { Box, Img } from "@chakra-ui/react";
import ColorMode from "./color-mode";
import icon from "../icon.png";
import { Link } from "@reach/router";

export default function Header() {
  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      as="header"
      p={4}
    >
      <Link to="/">
        <Img src={icon} alt="Beetle Icon." height="50" />
      </Link>
      <ColorMode />
    </Box>
  );
}
