import { Deck } from "@/model/Deck";
import { ThreeDotsButton } from "@/shared/components/ThreeDotsButton";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Button, Input, Select, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import { DeleteDeckConfirmationDialog } from "./DeleteDeckConfirmationDialog";


interface Props {
    deck: Deck;
}

export const DeckSettingsDialog: React.FC<Props> = ({ deck }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);

    return (
        <>
            <ThreeDotsButton onClick={() => setIsOpen(true)} />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody display='flex' flexDirection='column' gap={6}>
                    <Alert status='warning'>
                        <AlertIcon />
                        Editing deck is not yet available.
                    </Alert>
                    <FormControl isRequired isDisabled>
                        <FormLabel>Name</FormLabel>
                        <Input value={deck.name}/>
                    </FormControl>
                    <FormControl isRequired isDisabled>
                        <FormLabel>Language</FormLabel>
                        <Select value={deck.languageId} >
                            <option value={deck.languageId}>{deck.languageName}</option>
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button mr={4} variant='outline' onClick={() => setDeleteConfirmationOpen(true)}>Delete deck</Button>
                    <Button colorScheme="blue" onClick={() => setIsOpen(false)}>Save</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <DeleteDeckConfirmationDialog isOpen={isDeleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)} deck={deck}/>
        </>
    );
}