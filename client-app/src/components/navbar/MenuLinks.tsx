import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  MenuItem as MenuItemChakra,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { MenuItem } from "./MenuItem";
import { useMediaQuery } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

interface Props {
  isOpen: boolean;
}

export const MenuLinks: React.FC<Props> = ({ isOpen }) => {
  const [isLargerThan420] = useMediaQuery("(min-width: 30em)");

  const { logout, isLoggedIn } = useAuth();

  const allUsers = [
    { path: "/", name: "Home" },
    { path: "/recipes", name: "Recipes" },
  ];

  const signedIn = [
    { path: "/create-recipes", name: "Create Recipes" },
    { path: "/my-recipes", name: "My Recipes" },
    { path: "/account", name: "Account" },
  ];

  const signedOut = [
    { path: "/register", name: "Register" },
    { path: "/login", name: "Login" },
  ];

  const buttonMenu = (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontWeight="normal"
        colorScheme="pink"
      >
        Profile
      </MenuButton>
      <MenuList>
        {signedIn.map((route) => (
          <MenuItemChakra as={Link} to={route.path} key={route.path}>
            {route.name}
          </MenuItemChakra>
        ))}
        <MenuItemChakra onClick={() => logout()}>Logout</MenuItemChakra>
      </MenuList>
    </Menu>
  );

  const listMenu = (
    <React.Fragment>
      {signedIn.map((route) => (
        <MenuItem key={route.path} to={route.path}>
          {route.name}
        </MenuItem>
      ))}
      <Button color="currentcolor" onClick={() => logout()}>
        Logout
      </Button>
    </React.Fragment>
  );

  const signedOutList = (
    <React.Fragment>
      {signedOut.map((route) => (
        <MenuItem key={route.path} to={route.path}>
          {route.name}
        </MenuItem>
      ))}
    </React.Fragment>
  );

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
        {allUsers.map((route) => (
          <MenuItem key={route.path} to={route.path}>
            {route.name}
          </MenuItem>
        ))}
        {!isLoggedIn ? signedOutList : isLargerThan420 ? buttonMenu : listMenu}
      </Stack>
    </Box>
  );
};
