import { CheckIcon } from "@chakra-ui/icons";
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
import { useMutation } from "react-query";
import useAuth from "../hooks/use-auth";
import useExercises, { Exercise } from "../hooks/use-exercises";

interface AddWeightProps {
  exercise: string;
  weight: string;
  reps: string;
  user_id: string;
}

export default function Add(props: RouteComponentProps) {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const { user } = useAuth();
  const [error, setError] = React.useState({
    weight: "",
    exercise: "",
    reps: "",
  });

  const { isLoading, mutate } = useMutation((vars: AddWeightProps) =>
    fetch("/.netlify/functions/add-weight", {
      method: "POST",
      body: JSON.stringify(vars),
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
  );

  const { data: exercises, isLoading: exerciseLoading } = useExercises();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const exercise = form.get("exercise") as string;
    const weight = form.get("weight") as string;
    const reps = form.get("reps") as string;

    if (!exercise) {
      setError({ ...error, exercise: "Este campo es obligatorio" });
    }
    if (!weight) {
      setError({ ...error, weight: "Este campo es obligatorio" });
    }
    if (!reps) {
      setError({ ...error, reps: "Este campo es obligatorio" });
    }

    if (user && user?.id) {
      mutate({
        exercise,
        weight,
        reps,
        user_id: user?.id,
      });

      setHasSubmitted(true);
    }
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
        rightIcon={hasSubmitted ? <CheckIcon /> : undefined}
        colorScheme={hasSubmitted ? "green" : undefined}
      >
        {!hasSubmitted ? "Confirmar" : "Cargar otro"}
      </Button>
    </Box>
  );
}
