import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  HStack,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  Box,
  Stack,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import {
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import { useHistory, useParams } from "react-router";
import * as Yup from "yup";
import { useRecipe } from "../hooks/useRecipe";
import { useTags } from "../hooks/useTags";
import { useUserRecipes } from "../hooks/useUserRecipes";
import { Ingredients, Recipe } from "../types";
import { AuthContext } from "../contexts/authContext";

interface FormValues {
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  ingredients: Ingredients[];
  imgUrl: string;
}

const suffix = ["pcs", "kg", "g", "ts", "L", "dL"];

export const CreateRecipe = () => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    title: "",
    shortDescription: "",
    description: "",
    tags: [],
    ingredients: [],
    imgUrl: "",
  });
  const { recipeId } = useParams<{ recipeId: string | undefined }>();
  const toast = useToast();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const { data, empty, loading } = useTags();
  const { data: recipeData, loading: recipeLoading } = useRecipe(recipeId);
  const { mutate } = useUserRecipes(user?.token);

  useEffect(() => {
    if (!recipeLoading && recipeData) {
      setInitialValues({
        title: recipeData.title,
        shortDescription: recipeData.shortDescription,
        description: recipeData.description,
        tags: Object.values(recipeData.tags).map((tag) => tag.name),
        ingredients: recipeData.ingredients,
        imgUrl: recipeData.imgUrl,
      });
    }
  }, [recipeLoading, recipeData]);

  const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    shortDescription: Yup.string()
      .min(2, "Too Short!")
      .max(120, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(500, "Too Long!")
      .required("Required"),
    imgUrl: Yup.string().max(200, "Too Long!"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        console.log(values);
        const response = await fetch(
          recipeId ? "/recipe/" + recipeId : "recipe",
          {
            method: recipeId ? "PUT" : "POST",
            headers: !user?.token
              ? { "Content-Type": "application/json" }
              : {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user?.token}`,
                },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          toast({
            title: recipeId ? "Recipe updated." : "Recipe created",
            description: recipeId
              ? "Your recipe was successfully updated"
              : "Your recipe was successfully created",
            status: "success",
            duration: 4000,
            isClosable: true,
          });

          const recipeResponse = (await response.json()) as Recipe;

          mutate((userRecipes) => {
            if (!userRecipes) {
              return;
            }
            if (recipeId) {
              const filteredRecipes = userRecipes!.filter(
                (recipe) => recipe.id.toString() !== recipeId
              );
              return [...filteredRecipes, recipeResponse];
            } else {
              return [...userRecipes, recipeResponse];
            }
          });

          history.push("/my-recipes");
        } else {
          toast({
            title: "Error",
            description: recipeId
              ? "Your recipe was not updated"
              : "Your recipe was not created",
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
            <Field name="title">
              {({ form, field }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors?.title && !!form.touched?.title}
                >
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input {...field} id="title" placeholder="title" />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="shortDescription">
              {({ form, field }: FieldProps) => (
                <FormControl
                  isInvalid={
                    !!form.errors?.shortDescription &&
                    !!form.touched?.shortDescription
                  }
                >
                  <FormLabel htmlFor="shortDescription">
                    Short Description
                  </FormLabel>
                  <Textarea
                    {...field}
                    id="shortDescription"
                    placeholder="Short Description"
                  />
                  <FormErrorMessage>
                    {form.errors.shortDescription}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ form, field }: FieldProps) => (
                <FormControl
                  isInvalid={
                    !!form.errors?.description && !!form.touched?.description
                  }
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Description"
                  />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="imgUrl">
              {({ form, field }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors?.imgUrl && !!form.touched?.imgUrl}
                >
                  <FormLabel htmlFor="imgUrl">ImageUrl</FormLabel>
                  <Input {...field} id="imgUrl" placeholder="imgUrl" />
                  <FormErrorMessage>{form.errors.imgUrl}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <FormLabel htmlFor={`tags`} pt={1}>
              Tags
            </FormLabel>
            <FieldArray
              name="tags"
              render={(arrayHelpers) => (
                <div>
                  <Box pb={2}>
                    <Select
                      placeholder="Select tags"
                      onChange={(e) => arrayHelpers.push(e.target.value)}
                    >
                      {!loading &&
                        !empty &&
                        data!.map((tag) => (
                          <option key={tag.id} value={tag.name}>
                            {tag.name}
                          </option>
                        ))}
                    </Select>
                  </Box>
                  <HStack spacing={4}>
                    {values.tags &&
                      values.tags.length > 0 &&
                      values.tags.map((tag, index) => (
                        <Tag
                          key={index}
                          size="lg"
                          borderRadius="full"
                          variant="solid"
                          colorScheme="green"
                        >
                          <TagLabel>{tag}</TagLabel>
                          <TagCloseButton
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </Tag>
                      ))}
                  </HStack>
                </div>
              )}
            />
            <FormLabel htmlFor={`ingredients`} pt={1}>
              Ingredients
            </FormLabel>
            <FieldArray
              name="ingredients"
              render={(arrayHelpers) => (
                <div>
                  <Stack spacing={4}>
                    {values.ingredients &&
                      values.ingredients.length > 0 &&
                      values.ingredients.map((ingredients, index) => (
                        <Grid
                          key={index}
                          templateColumns="repeat(6, 1fr)"
                          gap={2}
                        >
                          <GridItem colSpan={3}>
                            <Field name={`ingredients[${index}].name`}>
                              {({ form, field }: FieldProps) => {
                                return (
                                  <FormControl
                                    isInvalid={
                                      !!form.errors?.ingredients &&
                                      !!form.touched?.ingredients
                                    }
                                  >
                                    <Input
                                      {...field}
                                      id={`ingredients[${index}].name`}
                                      placeholder="Ingredient"
                                    />
                                    <FormErrorMessage>
                                      {form.errors.name}
                                    </FormErrorMessage>
                                  </FormControl>
                                );
                              }}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={1}>
                            <Field name={`ingredients[${index}].amount`}>
                              {({ form, field }: FieldProps) => (
                                <FormControl
                                  isInvalid={
                                    !!form.errors?.ingredients &&
                                    !!form.touched?.ingredients
                                  }
                                >
                                  <Input
                                    {...field}
                                    id={`ingredients[${index}].amount`}
                                    placeholder="Amount"
                                  />
                                  <FormErrorMessage>
                                    {form.errors.name}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={1}>
                            <Field name={`ingredients[${index}].suffix`}>
                              {({ form, field }: FieldProps) => (
                                <FormControl
                                  isInvalid={
                                    !!form.errors?.ingredients &&
                                    !!form.touched?.ingredients
                                  }
                                >
                                  <Select
                                    id={`ingredients[${index}].suffix`}
                                    placeholder="Suffix"
                                    {...field}
                                  >
                                    {suffix.map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </Select>
                                  <FormErrorMessage>
                                    {form.errors.name}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={1}>
                            <Button onClick={() => arrayHelpers.remove(index)}>
                              -
                            </Button>
                          </GridItem>
                        </Grid>
                      ))}
                    <Button
                      onClick={() =>
                        arrayHelpers.push({ name: "", amount: 1, suffix: "" })
                      }
                    >
                      +
                    </Button>
                  </Stack>
                </div>
              )}
            />
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              {recipeId ? "Update" : "Submit"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
