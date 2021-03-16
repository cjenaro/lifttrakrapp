import { Grid } from "@chakra-ui/layout";
import * as React from "react";
import { Router } from "@reach/router";
import Layout from "./components/layout";
import Home from "./pages/home";

function App() {
  return (
    <Grid templateRows="auto 1fr auto" minH="100vh">
      <Layout>
        <Router style={{ height: "100%" }}>
          <Home path="/" />
        </Router>
      </Layout>
    </Grid>
  );
}

export default App;
