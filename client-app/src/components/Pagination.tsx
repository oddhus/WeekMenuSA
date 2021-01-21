import { Button, HStack } from '@chakra-ui/react';
import React from 'react';

interface Props {
    totalPage: number;
    onPageClick: (tag: number) => void
    hasNext: boolean;
    hasPrevious: boolean;
    currentPage: number | null | undefined;
}

export const Pagination: React.FC<Props> = (props) => {
    return (
        <HStack>
            <Button
                disabled={!props.hasPrevious}
                onClick={() => {
                    if (props.currentPage) {
                        props.onPageClick(props.currentPage - 1)
                    }

                }}>
                    Previous
                </Button>

            {[...Array.from({ length: props.totalPage }, (_, i) => i + 1)].map(num => (
                <Button
                    disabled={props?.currentPage === num}
                    key={num}
                    onClick={() => props.onPageClick(num)}
                    colorScheme={props?.currentPage === num ? "pink" : undefined}
                    variant={props?.currentPage === num ? "solid" : undefined}>
                    {num}
                </Button>
            ))}

            <Button
                disabled={!props.hasNext}
                onClick={() => {
                    if (props.currentPage) {
                        props.onPageClick(props.currentPage + 1)
                    }
                }}>
                    Next
                </Button>
 
        </HStack>
    );
}