import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Button, Input, Select, Alert, AlertIcon } from "@chakra-ui/react";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { Deck } from "../../model/Deck";
import { DeleteDeckConfirmationModal } from "./DeleteDeckConfirmationModal";

interface DeckSettingsModalProps {
    deck: Deck;
}

export const DeckSettingsModal: React.FC<DeckSettingsModalProps> = ({ deck }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);

    return (
        <>
            <IconButton variant='ghost' aria-label='Settings' icon={<IconDotsVertical />} onClick={() => setIsOpen(true)}/>
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
            <DeleteDeckConfirmationModal isOpen={isDeleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)} deck={deck}/>
        </>
    );
}