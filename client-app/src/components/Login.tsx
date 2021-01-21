import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../contexts/authContext";
import { User } from "../types";

interface FormValues {
  username: string;
  password: string;
}

export default function Login() {
  const toast = useToast();
  const history = useHistory();
  const { login } = useContext(AuthContext);

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
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, actions) => {
        console.log(values);
        const response = await fetch("user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const userData: User = await response.json();
          if (userData && login) {
            console.log(userData);
            login(userData);
          }

          toast({
            title: "Welcome back!",
            description: "You was successfully logged on",
            status: "success",
            duration: 4000,
            isClosable: true,
          });

          history.push("/");
        } else {
          toast({
            title: "Error",
            description: "Could sign in, please try again later",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      }}
      validationSchema={SignupSchema}
    >
      {(props: FormikProps<FormValues>) => {
        const { values, isSubmitting } = props;
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
          </Form>
        );
      }}
    </Formik>
  );
}
