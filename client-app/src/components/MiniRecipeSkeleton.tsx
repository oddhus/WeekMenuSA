import {
  Box,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  items?: number;
}

export const MiniRecipeSkeleton: React.FC<Props> = (props) => {
  return (
    <SimpleGrid columns={{ sm: 3, md: 5, lg: 7 }} spacing={2}>
      {[...Array(props.items || 5)].map((_, i) => (
        <Box
          paddingTop="8"
          paddingBottom="8"
          paddingLeft="2"
          paddingRight="2"
          boxShadow="lg"
          bg="white"
          key={i}
          maxW="sm"
          minW="8em"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          alignContent="center"
        >
          <SkeletonCircle size="5em" />
          <SkeletonText mt="4" noOfLines={2} spacing="6" />
        </Box>
      ))}
    </SimpleGrid>
  );
};
