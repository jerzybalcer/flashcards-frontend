import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import {Button} from "@chakra-ui/react"
import { useState } from "react";
import { FlashCard } from "../model/FlashCard";

interface AddCardModalProps {
    isOpen: boolean;
    flashCard?: FlashCard;
    onClose: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, flashCard, onClose }) => {
    const [foreignWord, setForeignWord] = useState<string>("")
    const [translatedWord, setTranslatedWord] = useState<string>("")

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} returnFocusOnClose={false}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{flashCard ? 'Edit card' : 'Add new card'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl>
                <FormLabel>Foreign Word</FormLabel>
                <Input placeholder='Enter the word' defaultValue={flashCard?.foreignWord ?? ''} />
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>Translated Word</FormLabel>
                <Input placeholder='Enter the word' defaultValue={flashCard?.translatedWord ?? ''} />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={onClose}>{flashCard ? 'Edit Item' : 'Add Item'}</Button>
                <Button variant='ghost' onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}