import * as React from "react";
import styled from "@emotion/styled";
import { SimpleGrid } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Link as RLink, RouteComponentProps } from "@reach/router";

export default function Home(props: RouteComponentProps) {
  return (
    <SimpleGrid columns={1} height="100%" rowGap={6}>
      <Button
        height="100%"
        textTransform="uppercase"
        letterSpacing="2px"
        fontSize="lg"
      >
        <Link to="add">Cargar Peso</Link>
      </Button>
      <Button
        height="100%"
        textTransform="uppercase"
        letterSpacing="2px"
        fontSize="lg"
      >
        <Link to="weights">Ver Pesos</Link>
      </Button>
    </SimpleGrid>
  );
}

const Link = styled(RLink)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
