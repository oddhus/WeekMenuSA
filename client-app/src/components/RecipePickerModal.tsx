import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, VStack, HStack, Input } from '@chakra-ui/react';
import React, { SetStateAction, useState } from 'react';
import { Recipe, RecipePaginated } from '../types';
import { RecipeListModal } from './RecipeListModal';

interface Query {
    searchText: string | undefined
    pageSize: number
}

interface Props {
    myRecipes: Recipe[] | undefined
    searchRecipes: RecipePaginated | undefined
    query: Query
    setQuery: React.Dispatch<SetStateAction<Query>>
    error: Error | undefined
    isOpen: boolean
    onClose: () => void
    loading: boolean
    onIdSwap: (newId: number) => void
    type: "search" | "myrecipe" | undefined
}

export const RecipePickerModal: React.FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    const onIdSwap = async (id: number) => {
        setLoading(true)
        await props.onIdSwap(id)
        props.onClose()
        setLoading(false)
    }

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                onClose={props.onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Pick a recipe</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            {props.type === "search" &&
                                <HStack>
                                    <Input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                                    <Button
                                        onClick={() => props.setQuery({ pageSize: 10, searchText })}
                                    >
                                        Search
                                    </Button>
                                </HStack>
                            }
                            {props.searchRecipes && <Text> {`Showing ${props.searchRecipes.recipes.length + 1 || 0}  recipes`}</Text>}
                            {props.myRecipes && <Text> {`Showing ${props.myRecipes.length + 1 || 0}  recipes`}</Text>}
                            {props.loading ?
                                <Center>
                                    <Spinner />
                                </Center> :
                                    props.error ||
                                !props.type ||
                                !(props.myRecipes || props.searchRecipes?.recipes) ?
                                    <Text> Could not retrive recipes </Text> :
                                        <RecipeListModal
                                            loading={loading}
                                            onIdSwap={onIdSwap}
                                            recipes={props.type === "myrecipe" ? props.myRecipes! : props.searchRecipes!.recipes}
                                        />
                            }
                            {loading && <Center pt={2}><Spinner /></Center>}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="yellow" mr={3} onClick={props.onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}