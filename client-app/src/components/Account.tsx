import { Heading, VStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/authContext";

export const Account: React.FC = () => {
  const { user, logout } = useAuth();

  const onDelete = async () => {
    const response = await fetch("/user", {
      method: "Delete",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: null,
    });
    if (response.ok) {
      logout();
    }
  };
  return (
    <VStack alignItems="flex-start">
      <Heading>Account</Heading>
      <Text>Username: {user?.username}</Text>
      <Button colorScheme="red" onClick={onDelete}>
        Delete Account
      </Button>
    </VStack>
  );
};
