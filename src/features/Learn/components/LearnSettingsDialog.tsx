import { Modal, ModalOverlay, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { LearnSettingsForm } from "./LearnSettingsForm";


interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const LearnSettingsDialog: React.FC<Props> = ({ isOpen, onClose }) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                   <LearnSettingsForm />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}