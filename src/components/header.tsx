import * as React from "react";
import { Box } from "@chakra-ui/react";
import ColorMode from "./color-mode";

export default function Header() {
  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      as="header"
      py={5}
      px={10}
    >
      Gym Tracker
      <ColorMode />
    </Box>
  );
}
