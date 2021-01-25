import { Heading, VStack, Text, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/authContext";
import { ConfirmModal } from "./ConfirmModal";

export const Account: React.FC = () => {
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <ConfirmModal
        title="Delete Account"
        bodyText="This will permanently delete your account"
        primaryButtonText="Delete"
        buttonAction={onDelete}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Heading>Account</Heading>
      <Text>Username: {user?.username}</Text>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Account
      </Button>
    </VStack>
  );
};
