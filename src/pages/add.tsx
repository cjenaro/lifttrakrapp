import { Box, Heading } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import * as React from "react";

export default function Add(props: RouteComponentProps) {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    weight: "",
    exercise: "",
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading size="lg">Agregar Peso</Heading>
      <FormControl id="exercise" isRequired mt={4}>
        <FormLabel>Ejercicio</FormLabel>
        <Select name="exercise">
          <option value={1}>Press de banco</option>
          <option value={2}>Press militar</option>
        </Select>
        <FormErrorMessage>{error.exercise}</FormErrorMessage>
      </FormControl>
      <FormControl id="weight" isRequired mt={4}>
        <FormLabel>Peso</FormLabel>
        <NumberInput min={0}>
          <NumberInputField name="weight" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{error.weight}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        mt={8}
        width="100%"
        loadingText="Enviando"
        isLoading={isLoading}
      >
        Confirmar
      </Button>
    </Box>
  );
}
