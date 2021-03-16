import * as React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface Props {
  path: string;
  component: React.ReactNode;
}

export default function AnimatedRoute({ path, component }: Props) {
  return (
    <MotionDiv
      key={path}
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{
        duration: 0.3,
      }}
    >
      {component}
    </MotionDiv>
  );
}

const MotionDiv = styled(motion.div)`
  height: 100%;
`;
