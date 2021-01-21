import React from 'react';
import { Badge, Box, HStack, Image } from '@chakra-ui/react';
import { Recipe } from '../types';
import { useHistory } from 'react-router';

type Props = {
    recipe: Recipe;
    onTagClick?: (tag: string) => void
};

export const RecipeCard: React.FC<Props> = (props) => {
    const history = useHistory()
    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">

            <Image src={props.recipe.imgUrl} alt={props.recipe.title} objectFit="cover" overflow="hidden" height="200px" width="300px" />
            <Box p="6">
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    onClick={() => history.push("/recipes/" + props.recipe.id)}
                    _hover={{ cursor: "pointer", color: "pink.500" }}
                >
                    {props.recipe.title}
                </Box>

                <Box>
                    {props.recipe.shortDescription}
                </Box>
                <HStack>
                    {props.recipe.tags.map((tag, i) => (
                        <Badge
                            key={tag.name}
                            borderRadius="full"
                            px="2"
                            colorScheme="teal"
                            onClick={() => { if (props.onTagClick) { props.onTagClick(tag.name) } }}
                            _hover={{ cursor: "pointer", backgroundColor: "blue.300" }}
                        >
                            {tag.name}
                        </Badge>
                    ))}
                </HStack>

                <Box d="flex" mt="2" alignItems="center">

                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {props.recipe.vote} score
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}