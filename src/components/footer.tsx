import * as React from "react";
import { Box, Link, Text } from "@chakra-ui/layout";

export default function Footer() {
  return (
    <Box as="footer" px={4} py={5}>
      <Text textAlign="center">
        Hecho con 💻 por{" "}
        <Link href="https://twitter.com/jenaroc" target="_blank" rel="noopener noreferrer">
          @jenaroc
        </Link>
      </Text>
    </Box>
  );
}
