import { Box, Button, HStack, Input, Select, Tag, TagCloseButton, TagLabel, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, Form, Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTags } from '../hooks/useTags';
import {
    StringParam,
    NumberParam,
    useQueryParams,
    ArrayParam,
    withDefault,
} from 'use-query-params';

interface Props {
}

interface IQueryParams {
    tags: (null | string)[] | never[];
    pageSize: number;
    searchText: string;
}

const initialQuery = {
    tags: [],
    pageSize: 10,
    searchText: ""
}

export const SearchBar: React.FC<Props> = () => {
    const [currentQuery, setCurrentQuery] = useState<IQueryParams>(initialQuery)

    const { data, loading, empty } = useTags()

    let boundArrayHelpers: FieldArrayRenderProps
    const bindArrayHelpers = (arrayHelpers: FieldArrayRenderProps) => {
        boundArrayHelpers = arrayHelpers
    }

    const [query, setQuery] = useQueryParams({
        searchText: StringParam,
        pageNumber: NumberParam,
        pageSize: NumberParam,
        tags: withDefault(ArrayParam, []),
    });

    const options = [2, 5, 10, 20]

    useEffect(() => {
        if (query) {
            setCurrentQuery({
                tags: query.tags || [],
                pageSize: query.pageSize || 10,
                searchText: query.searchText || ""
            })
        }
    }, [query])

    const onReset = () => {
        setQuery({ pageNumber: 1, ...initialQuery })
    }

    return (
        <Formik
            enableReinitialize
            initialValues={currentQuery}
            onSubmit={async (values, actions) => {
                setQuery({ pageNumber: 1, ...values })
            }}
        >
            {(props: FormikProps<IQueryParams>) => {
                const {
                    values,
                    isSubmitting,
                } = props
                return (
                    <Form>
                        <Box pb={2}>
                            <VStack alignItems="flex-end">
                                <Field name="searchText">
                                    {({ form, field }: FieldProps) => (
                                        <Input {...field} id="searchText" placeholder="Search" variant="flushed" />
                                    )}
                                </Field>
                                <Wrap spacing={2} justify="flex-end">
                                    <WrapItem>
                                        <FieldArray name="tags"
                                            render={arrayHelpers => {
                                                bindArrayHelpers(arrayHelpers)
                                                return (
                                                    <div>
                                                        <Box pb={2}>
                                                            <Select placeholder="Select tags" onChange={(e) => {
                                                                arrayHelpers.push(e.target.value)
                                                            }}>
                                                                {!loading && !empty && data!.map(tag => (
                                                                    <option key={tag.id} value={tag.name}>{tag.name}</option>
                                                                ))
                                                                }
                                                            </Select>
                                                        </Box>
                                                    </div>

                                                )
                                            }}
                                        />
                                    </WrapItem>
                                    <WrapItem>
                                        <Field name="pageSize">
                                            {({ form, field }: FieldProps) => (
                                                <Box>
                                                    <Select placeholder="Show" {...field} id="pageSize" >
                                                        {options.map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </Select>
                                                </Box>
                                            )}
                                        </Field>
                                    </WrapItem>
                                    <WrapItem>
                                        <HStack>
                                            <Box>
                                                <Button onClick={() => (onReset())}>Reset</Button>
                                            </Box>
                                            <Box>
                                                <Button
                                                    isLoading={isSubmitting}
                                                    type="submit"
                                                    colorScheme="pink"
                                                >
                                                    Search
                                                </Button>
                                            </Box>
                                        </HStack>
                                    </WrapItem>
                                </Wrap>
                            </VStack>
                            <HStack spacing={4}>
                                {values.tags && values.tags.length > 0 && (
                                    (values!.tags as (string)[]).map((tag: string, i: number) => (
                                        <Tag
                                            key={i}
                                            size="lg"
                                            borderRadius="full"
                                            variant="solid"
                                            colorScheme="green"
                                        >

                                            <TagLabel>{tag}</TagLabel>
                                            <TagCloseButton onClick={() => boundArrayHelpers.remove(i)} />

                                        </Tag>
                                    ))
                                )}
                            </HStack>
                        </Box>
                    </Form>
                )
            }}
        </Formik>
    );
}