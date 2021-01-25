import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Spinner,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Tooltip,
} from "@chakra-ui/react";

import { Recipe } from "../types";
import { RepeatIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router";

type Props = {
  recipe: Recipe;
  onSwap: (id: number) => void;
  openRecipePicker: () => void;
  setCurrentItem: React.Dispatch<React.SetStateAction<number | undefined>>;
  setType: React.Dispatch<
    React.SetStateAction<"search" | "myrecipe" | undefined>
  >;
  token: string | null | undefined;
};

export const MiniRecipeCard: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSwap = async () => {
    setLoading(true);
    props.onSwap(props.recipe.id);
  };

  return (
    <React.Fragment>
      <Box
        minW="8em"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        _hover={{
          boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
          cursor: "pointer",
          //transform: "translate3d(0px, -1px, 0px)"
        }}
      >
        <VStack>
          <Box onClick={() => history.push(`/recipes/${props.recipe.id}`)}>
            <Image
              src={props.recipe.imgUrl}
              alt={props.recipe.title}
              objectFit="cover"
              overflow="hidden"
              height="200px"
              width="300px"
            />
            <Center pt={1}>
              <Heading size="sm">{props.recipe.title}</Heading>
            </Center>
          </Box>
          <Box pb={2}>
            <HStack justify="space-betweens">
              <Text>Score: {props.recipe.vote}</Text>
              <Box h="25px">
                <Divider orientation="vertical" />
              </Box>
              <Menu>
                <Tooltip label="Swap recipe" fontSize="md">
                  <MenuButton
                    as={Button}
                    size="xs"
                    colorScheme="pink"
                    variant="outline"
                  >
                    {loading ? <Spinner size="xs" /> : <RepeatIcon />}
                  </MenuButton>
                </Tooltip>
                <MenuList>
                  <MenuItem onClick={() => onSwap()}>Random Swap</MenuItem>
                  <MenuItem
                    onClick={() => {
                      props.setCurrentItem(props.recipe.id);
                      props.openRecipePicker();
                      props.setType("search");
                    }}
                  >
                    Search
                  </MenuItem>
                  <MenuItem
                    isDisabled={!props.token}
                    onClick={() => {
                      props.setCurrentItem(props.recipe.id);
                      props.openRecipePicker();
                      props.setType("myrecipe");
                    }}
                  >
                    My recipes
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </React.Fragment>
  );
};
