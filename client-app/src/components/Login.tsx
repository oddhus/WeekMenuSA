import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  Alert,
  AlertIcon,
  Box,
  Container,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../contexts/authContext";
import { User } from "../types";

interface FormValues {
  username: string;
  password: string;
}

export default function Login() {
  const [dbError, setDbError] = useState("");
  const toast = useToast();
  const history = useHistory();
  const { login } = useAuth();
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(16, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(256, "Too Long!")
      .required("Required"),
  });

  return (
    <Container>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, actions) => {
          setDbError("");
          const response = await fetch("user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });

          if (response.ok) {
            const userData: User = await response.json();
            if (userData) {
              login(userData);
              toast({
                title: "Welcome back!",
                description: "You was successfully logged on",
                status: "success",
                duration: 4000,
                isClosable: true,
              });

              history.push("/");
            }
          } else if (response.status === 400) {
            setDbError("Password or Username is wrong");
          } else {
            setDbError("Could sign in, please try again later");
          }
        }}
        validationSchema={SignupSchema}
      >
        {(props: FormikProps<FormValues>) => {
          const { isSubmitting } = props;
          return (
            <Form>
              <Field name="username">
                {({ form, field }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors?.username && !!form.touched?.username
                    }
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input {...field} id="username" placeholder="Username" />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ form, field }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors?.password && !!form.touched?.password
                    }
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Password"
                      type="password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
              {!!dbError && (
                <Box pt={2}>
                  <Alert status="error">
                    <AlertIcon />
                    {dbError}
                  </Alert>
                </Box>
              )}
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
