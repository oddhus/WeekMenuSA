import React from "react"
import { Box, Text } from "@chakra-ui/react"

export const Logo = (props: any) => {
    return (
        <Box {...props}>
            <Text fontSize="lg" fontWeight="bold">
                WeekMenu
            </Text>
        </Box>
    )
}