import {
  Spinner,
  Text,
  Box,
  Heading,
  Button,
  useToast,
  Center,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useUserRecipes } from "../hooks/useUserRecipes";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/authContext";

export const UserRecipes = () => {
  const toast = useToast();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const { data, loading, mutate, empty } = useUserRecipes(user?.token);

  const onDelete = async (id: number, title: string) => {
    const response = await fetch("recipe/" + id, {
      method: "DELETE",
      headers: !user?.token ? {} : { Authorization: `Bearer ${user.token}` },
      body: null,
    });
    if (response.ok) {
      mutate((recipes) => {
        if (!recipes) {
          return;
        }
        const filteredRecipes = recipes!.filter((recipe) => recipe.id !== id);
        return [...filteredRecipes];
      });
      toast({
        title: "Recipe Deleted.",
        description: `Successfully deleted ${title}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Center>
      {loading ? (
        <Spinner />
      ) : empty ? (
        <VStack spacing={4}>
          <Heading color="grey.500">You have no recipes..</Heading>
          <Center>
            <Button
              color="pink.500"
              onClick={() => history.push("/create-recipes")}
            >
              Create One?
            </Button>
          </Center>
        </VStack>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Short description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data!.map((recipe) => (
              <Tr key={recipe.id}>
                <Td>
                  <Text fontWeight="bold">{recipe.title}</Text>
                </Td>
                <Td>
                  <Box maxW={[70, 150]}>
                    <Text isTruncated>{recipe.shortDescription}</Text>
                  </Box>
                </Td>
                <Td>
                  <Wrap>
                    <WrapItem>
                      <Button
                        colorScheme="yellow"
                        variant="solid"
                        onClick={() => history.push(`edit/${recipe.id}`)}
                      >
                        Edit
                      </Button>
                    </WrapItem>
                    <WrapItem>
                      <Button
                        colorScheme="pink"
                        variant="solid"
                        onClick={() => onDelete(recipe.id, recipe.title)}
                      >
                        Delete
                      </Button>
                    </WrapItem>
                  </Wrap>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Center>
  );
};
