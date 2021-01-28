import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../contexts/authContext";

interface FormValues {
  username: string;
  password: string;
  repeatPassword: string;
}

export default function Register() {
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
    repeatPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <Container>
      <Formik
        initialValues={{ username: "", password: "", repeatPassword: "" }}
        onSubmit={async (values, actions) => {
          setDbError("");
          const response = await fetch("user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });

          if (response.ok) {
            const data = await response.json();
            if (data) {
              toast({
                title: "Account Created",
                description: "Your account was successfully created",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
              login(data);
              history.push("/");
            }
          } else if (response.status === 400) {
            setDbError("Username is not available");
          } else {
            setDbError("Could not create account, please try again later");
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
              <Field name="repeatPassword">
                {({ form, field }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors?.repeatPassword &&
                      !!form.touched?.repeatPassword
                    }
                  >
                    <FormLabel htmlFor="repeatPassword">
                      Repeat Password
                    </FormLabel>
                    <Input
                      {...field}
                      id="repeatPassword"
                      placeholder="Repeat Password"
                      type="password"
                    />
                    <FormErrorMessage>
                      {form.errors.repeatPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Register
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
