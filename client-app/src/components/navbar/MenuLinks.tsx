import { Box, Menu, MenuButton, MenuList, Stack, MenuItem as MenuItemChakra, Button, MenuGroup, } from '@chakra-ui/react';
import React from 'react';
import { MenuItem } from './MenuItem';
import { useMediaQuery } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';

interface Props {
    isOpen: boolean
}

export const MenuLinks: React.FC<Props> = ({ isOpen }) => {
    const [isLargerThan420] = useMediaQuery("(min-width: 30em)")

    const logoutPath = "/logout"
    const userName = "hi"
    const profilePath = "/profile"

    const buttonMenu = (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} fontWeight="normal" colorScheme="pink">
                Profile
            </MenuButton>
            <MenuList>
                <MenuItemChakra as={Link} to="/create-recipes">Create Recipe</MenuItemChakra>
                <MenuItemChakra as={Link} to="/my-recipes">My Recipes</MenuItemChakra>
                <MenuGroup title={`${userName}`}>
                    <MenuItemChakra as={Link} to={profilePath}>
                        Account
                    </MenuItemChakra>
                    <MenuItemChakra as={Link} to={logoutPath}>
                        Logout
                    </MenuItemChakra>
                </MenuGroup>
            </MenuList>
        </Menu>
    )

    const listMenu = (
        <React.Fragment>
            <MenuItem to="/recipes">Recipe</MenuItem>
            <MenuItem to="/create-recipes">Create Recipe</MenuItem>
            <MenuItem to="/my-recipes">My Recipes</MenuItem>
            <MenuItem to={profilePath}>
                {`${userName}'s account`}
            </MenuItem>
            <MenuItem to={logoutPath}>
                Logout
            </MenuItem>
        </React.Fragment>
    )

    return (
        <Box
            display={{ base: isOpen ? "block" : "none", sm: "block" }}
            flexBasis={{ base: "100%", sm: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "flex-end", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 0, 0, 0]}
            >
                <MenuItem to="/">Home</MenuItem>
                <MenuItem to="/recipes">Recipes</MenuItem>
                {isLargerThan420 ? buttonMenu : listMenu}
            </Stack>
        </Box>
    );
}