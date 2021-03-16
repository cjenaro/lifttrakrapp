import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      'body > [role="group"] + [role="group"]': {
        position: "absolute",
        top: 0,
        left: 0,
      },
    },
  },
});

export default theme;
