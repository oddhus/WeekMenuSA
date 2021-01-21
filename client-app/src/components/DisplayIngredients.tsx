import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { Ingredients } from '../types';

interface Props {
    ingredients: Ingredients[]
}

export const DisplayIngredients: React.FC<Props> = (props) => {
    return (
        <Box bg="pink.50" borderColor="pink.500" borderWidth="1px" borderRadius="lg" overflow="hidden" p="2">
            <Table size="sm" colorScheme="pink">
                <Thead>
                    <Tr>
                        <Th>Ingredient</Th>
                        <Th isNumeric>Amount</Th>
                        <Th>Suffix</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.ingredients.map(ingredient => (
                        < Tr key={`${ingredient.name}-${ingredient.amount}-${ingredient.suffix}`}>
                            <Td>{ingredient.name}</Td>
                            <Td isNumeric>{Math.round((ingredient.amount + Number.EPSILON) * 100) / 100}</Td>
                            <Td>{ingredient.suffix}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}