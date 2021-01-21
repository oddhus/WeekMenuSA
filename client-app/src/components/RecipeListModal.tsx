import { Button, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Recipe } from '../types';
import React from 'react';

interface Props {
    recipes: Recipe[]
    loading: boolean
    onIdSwap: (newId: number) => void
}

export const RecipeListModal: React.FC<Props> = (props) => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Title</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.recipes.map(recipe => (
                    <Tr key={recipe.id}>
                        <Td><Heading size="xs">{recipe.title}</Heading></Td>
                        <Td>
                            <Button
                                size="sm"
                                isDisabled={props.loading}
                                disabled={props.loading}
                                onClick={() => props.onIdSwap(recipe.id)}
                            >
                                Add
                            </Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}