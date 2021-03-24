import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import * as React from "react";
import useAuth from "../hooks/use-auth";

export default function Login() {
  const { login, register, error: authError, isLoading } = useAuth();
  const [error, setError] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    setError({
      email: "",
      password: "",
      confirmPassword: "",
    });

    if (!email) {
      setError({ ...error, email: "Este campo es obligatiorio" });
      return;
    }

    if (!password) {
      setError({ ...error, password: "Este campo es obligatiorio" });
      return;
    }

    login({ email, password });
  }

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;
    setError({
      email: "",
      password: "",
      confirmPassword: "",
    });

    if (!email) {
      setError({ ...error, email: "Este campo es obligatiorio" });
      return;
    }

    if (!password) {
      setError({ ...error, password: "Este campo es obligatiorio" });
      return;
    }

    if (!confirmPassword) {
      setError({ ...error, confirmPassword: "Este campo es obligatiorio" });
      return;
    }

    if (password !== confirmPassword) {
      setError({ ...error, confirmPassword: "Las contraseñas no coinciden" });
      return;
    }

    register({ email, password });
  }

  return (
    <Tabs>
      <TabList>
        <Tab>
          <Heading size="lg" textAlign="center">
            Iniciar Sesión
          </Heading>
        </Tab>
        <Tab>
          <Heading size="lg" textAlign="center">
            Registrar
          </Heading>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box as="form" p={6} onSubmit={handleSubmit}>
            <FormControl
              id="email"
              isRequired
              mt={4}
              isInvalid={Boolean(error.email)}
            >
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" />
              <FormErrorMessage>{error.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              mt={4}
              isInvalid={Boolean(error.password)}
            >
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" name="password" />
              <FormErrorMessage>{error.password}</FormErrorMessage>
            </FormControl>
            <Button type="submit" mt={8} width="100%" isLoading={isLoading}>
              Ingresar &rarr;
            </Button>
          </Box>
          <FormControl isInvalid={Boolean(authError)}>
            <FormErrorMessage>{authError}</FormErrorMessage>
          </FormControl>
        </TabPanel>
        <TabPanel>
          <Box as="form" p={6} onSubmit={handleRegister}>
            <FormControl
              id="email"
              isRequired
              mt={4}
              isInvalid={Boolean(error.email)}
            >
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" />
              <FormErrorMessage>{error.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              mt={4}
              isInvalid={Boolean(error.password)}
            >
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" name="password" />
              <FormErrorMessage>{error.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="confirmPassword"
              isRequired
              mt={4}
              isInvalid={Boolean(error.confirmPassword)}
            >
              <FormLabel>Confirmar Contraseña</FormLabel>
              <Input type="password" name="confirmPassword" />
              <FormErrorMessage>{error.confirmPassword}</FormErrorMessage>
            </FormControl>
            <Button type="submit" mt={8} width="100%" isLoading={isLoading}>
              Registrarse &rarr;
            </Button>
          </Box>
          <FormControl isInvalid={Boolean(authError)}>
            <FormErrorMessage>{authError}</FormErrorMessage>
          </FormControl>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
