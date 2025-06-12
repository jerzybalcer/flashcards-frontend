import { useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { useAddDeck } from "@/features/AllDecks/hooks/useAddDeck";
import { AddDeckForm } from "./AddDeckForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AddDeckDialog: React.FC<Props> = ({ isOpen, onClose }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const { handleSave, handleClose } = useAddDeck(onClose);

    function handleConfirm() {
        formRef.current?.requestSubmit();
    }

    return (
    <Modal isOpen={isOpen} onClose={() => handleClose()} autoFocus={false} returnFocusOnClose={false} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader fontWeight='bold'>New deck</ModalHeader>
            <ModalCloseButton />
            <ModalBody display='flex' flexDirection='column' gap={4}>
                <AddDeckForm formRef={formRef} onSubmit={handleSave} />
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={4} onClick={() => handleConfirm()}>Save</Button>
                <Button variant='ghost' onClick={() => handleClose()}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    );
}