import * as React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      borderRadius="full"
      aria-label={`Toggle ${colorMode === "light" ? "Dark" : "Light"}`}
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  );
}
