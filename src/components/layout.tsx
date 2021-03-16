import { Box, Container } from "@chakra-ui/layout";
import * as React from "react";
import useAuth from "../hooks/use-auth";
import Footer from "./footer";
import Header from "./header";
import Login from "./login";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Box as="main">
        <Container height="100%">{user ? children : <Login />}</Container>
      </Box>
      <Footer />
    </>
  );
}
