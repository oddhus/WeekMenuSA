import {
  Center,
  Spinner,
  VStack,
  Text,
  Image,
  Box,
  Heading,
  UnorderedList,
  ListItem,
  HStack,
  Badge,
  Container,
  color,
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useRecipe } from "../hooks/useRecipe";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../contexts/authContext";

export const DisplayRecipe = () => {
  const { user } = useContext(AuthContext);
  const { recipeId } = useParams<{ recipeId: string | undefined }>();
  const [loadingVote, setLoadingVote] = useState(false);
  const { data, loading, mutate } = useRecipe(recipeId, user?.token);

  const onVote = async (vote: number) => {
    setLoadingVote(true);
    const response = await fetch("vote/" + recipeId, {
      method: "POST",
      headers: !user?.token
        ? {}
        : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
      body: JSON.stringify({ vote }),
    });

    if (response.ok && (await response.json())) {
      mutate((recipe) => {
        if (!recipe) {
          return;
        }
        recipe.userVote = vote;
        recipe.vote = recipe.vote + vote;
        return recipe;
      });
    }

    setLoadingVote(false);
  };

  return (
    <Center>
      {loading ? (
        <Spinner />
      ) : !data ? (
        <Center>
          <Text>Could not find any recipe...</Text>
        </Center>
      ) : (
        <VStack align="flex-start">
          <Image
            src={data!.imgUrl}
            alt={data!.title}
            width="500px"
            height="300px"
            overflow="hidden"
            objectFit="cover"
          />
          <HStack justify="space-between">
            <Heading>{data!.title}</Heading>
            <HStack>
              <TriangleUpIcon
                color={data!.userVote === 1 ? "green.500" : "inherit"}
                onClick={() => onVote(1)}
                _hover={{ color: "green.300", cursor: "pointer" }}
                disabled={data!.userVote === 1}
              />
              <Text>{data!.vote}</Text>
              <TriangleDownIcon
                color={data!.userVote === -1 ? "red.500" : ""}
                onClick={() => onVote(-1)}
                _hover={{ color: "red.300", cursor: "pointer" }}
                disabled={data!.userVote === -1}
              />
              {loadingVote && <Spinner />}
            </HStack>
          </HStack>
          <Text fontSize="xl">{data!.shortDescription}</Text>
          <HStack>
            {data!.tags.map((tag, i) => (
              <Badge key={i} borderRadius="full" px="2" colorScheme="teal">
                {tag.name}
              </Badge>
            ))}
          </HStack>
          <Box
            bg="gray.300"
            borderColor="gray.500"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="2"
          >
            <UnorderedList>
              {data!.ingredients.map((ingredient) => (
                <ListItem key={ingredient.name}>
                  {`${ingredient.name}: ${ingredient.amount} ${ingredient.suffix}`}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Container pl="0" pr="0">
            <Text>{data!.description}</Text>
          </Container>
        </VStack>
      )}
    </Center>
  );
};
