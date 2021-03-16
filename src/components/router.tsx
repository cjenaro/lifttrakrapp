import * as React from "react";
import { Router, Location } from "@reach/router";
import Home from "../pages/home";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@chakra-ui/layout";
import Weights from "../pages/weights";
import Add from "../pages/add";
import { Button } from "@chakra-ui/button";
import AnimatedRoute from "./animated-route";

export default function FramerRouter() {
  return (
    <Location>
      {({ location, navigate }) => (
        <Box position="relative" height="100%">
          <AnimatePresence exitBeforeEnter>
            {location.pathname === "/" ? null : (
              <BackButton
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                }}
                size="xs"
                mb={2}
                onClick={() => navigate("../")}
              >
                &larr; Back
              </BackButton>
            )}
            <Router
              key={location.key}
              location={location}
              style={{ height: "100%" }}
            >
              <AnimatedRoute path="/" component={<Home />} />
              <AnimatedRoute path="weights" component={<Weights />} />
              <AnimatedRoute path="add" component={<Add />} />
            </Router>
          </AnimatePresence>
        </Box>
      )}
    </Location>
  );
}

const BackButton = motion(Button);
