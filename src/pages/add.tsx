import { Box, Heading } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import useExercises, { Exercise } from "../hooks/use-exercises";

export default function Add(props: RouteComponentProps) {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    weight: "",
    exercise: "",
    reps: "",
  });

  const { data: exercises, isLoading: exerciseLoading } = useExercises();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading textAlign="center" size="lg">
        Agregar Peso
      </Heading>
      <FormControl id="exercise" isRequired mt={4}>
        <FormLabel>Ejercicio</FormLabel>
        <Select name="exercise">
          {exercises?.map((exercise: Exercise) => (
            <option value={exercise.id} key={exercise.id}>
              {exercise.name}
            </option>
          ))}
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
      <FormControl id="reps" isRequired mt={4}>
        <FormLabel>Repeticiones</FormLabel>
        <NumberInput min={1}>
          <NumberInputField name="reps" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{error.reps}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        mt={8}
        width="100%"
        loadingText={isLoading ? "Enviando" : "Cargando"}
        isLoading={isLoading || exerciseLoading}
      >
        Confirmar
      </Button>
    </Box>
  );
}
