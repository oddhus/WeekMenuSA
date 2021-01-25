import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  bodyText: string;
  primaryButtonText: string;
  buttonAction: () => void | Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

export const ConfirmModal: React.FC<Props> = (props) => {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.bodyText}</ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                props.buttonAction();
                props.onClose();
              }}
              colorScheme="pink"
            >
              {props.primaryButtonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
