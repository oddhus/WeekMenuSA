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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useUserRecipes } from "../hooks/useUserRecipes";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/authContext";
import { ConfirmModal } from "./ConfirmModal";

interface RecipeInfo {
  id: number | null;
  title: string | null;
}

export const UserRecipes = () => {
  const [currentItems, setCurrentItems] = useState<RecipeInfo>({
    id: null,
    title: null,
  });
  const toast = useToast();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, loading, mutate, empty } = useUserRecipes(user?.token);

  const onDelete = async () => {
    const response = await fetch("recipe/" + currentItems.id, {
      method: "DELETE",
      headers: !user?.token ? {} : { Authorization: `Bearer ${user.token}` },
      body: null,
    });
    if (response.ok) {
      mutate((recipes) => {
        if (!recipes) {
          return;
        }
        const filteredRecipes = recipes!.filter(
          (recipe) => recipe.id !== currentItems.id
        );
        return [...filteredRecipes];
      });
      toast({
        title: "Recipe Deleted.",
        description: `Successfully deleted ${currentItems.title}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ConfirmModal
        title="Delete Recipe"
        bodyText="This will permanently delete your recipe."
        buttonAction={onDelete}
        isOpen={isOpen}
        onClose={onClose}
        primaryButtonText="Delete"
      />
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
                          onClick={() => {
                            setCurrentItems({
                              id: recipe.id,
                              title: recipe.title,
                            });
                            onOpen();
                          }}
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
    </>
  );
};
