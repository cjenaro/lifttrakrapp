import * as React from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";

export default function Weights(props: RouteComponentProps) {
  const [form, setForm] = React.useState({
    exercise: 1,
    reps: 1,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Box>
      <Heading size="lg">Ver Peso</Heading>
      <SimpleGrid gridTemplateColumns="1fr min-content" columnGap={4} mt={4}>
        <FormControl id="exercise" isRequired>
          <FormLabel>Ejercicio</FormLabel>
          <Select name="exercise" onChange={handleChange} value={form.exercise}>
            <option value={1}>Press de banco</option>
            <option value={2}>Press militar</option>
          </Select>
        </FormControl>
        <FormControl id="reps" isRequired>
          <FormLabel>Repeticiones</FormLabel>
          <NumberInput
            onChange={(_, valueAsNumber) =>
              setForm({ ...form, reps: valueAsNumber })
            }
            value={form.reps}
            min={1}
            max={15}
            step={1}
          >
            <NumberInputField name="reps" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Button
          fontSize="8xl"
          boxSize="max"
          p={5}
          w="100%"
          gridColumn="-1/1"
          textAlign="center"
          my={20}
        >
          100kg
        </Button>
      </SimpleGrid>
    </Box>
  );
}
