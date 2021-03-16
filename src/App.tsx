import { Grid } from "@chakra-ui/layout";
import * as React from "react";
import Router from "./components/router";
import Layout from "./components/layout";

function App() {
  return (
    <Grid templateRows="auto 1fr auto" minH="100vh">
      <Layout>
        <Router />
      </Layout>
    </Grid>
  );
}

export default App;
