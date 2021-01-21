import { Flex } from '@chakra-ui/react'
import React from 'react'

export const NavBarContainer: React.FC = ({ children, ...props }) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={4}
            p={4}
            bg={["pink.500", "transparent", "transparent", "transparent"]}
            color={["white", "pink.700", "pink.700", "pink.700"]}
            borderBottom="1px"
            borderBottomColor="pink.700"
            {...props}
        >
            {children}
        </Flex>
    )
}