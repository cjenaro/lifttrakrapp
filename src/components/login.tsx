import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import * as React from "react";
import useAuth from "../hooks/use-auth";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = React.useState({ email: "", password: "" });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email) {
      setError({ ...error, email: "Este campo es obligatiorio" });
    }

    if (!password) {
      setError({ ...error, password: "Este campo es obligatiorio" });
    }

    login({ email });
  }

  return (
    <Box>
      <Box as="form" p={6} onSubmit={handleSubmit}>
        <Heading size="lg" mb={4} textAlign="center">
          Login
        </Heading>
        <FormControl id="email" isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" />
          <FormErrorMessage>{error.email}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" name="password" />
          <FormErrorMessage>{error.password}</FormErrorMessage>
        </FormControl>
        <Button type="submit" mt={8} width="100%">
          Ingresar &rarr;
        </Button>
      </Box>
    </Box>
  );
}
