import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import {Button} from "@chakra-ui/react"
import { useState } from "react";
import {addCard} from "../services/CardService"

interface AddCardModalProps {
    isOpen: boolean;    
    onClose: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose }) => {
    const [foreignWord, setForeignWord] = useState<string>("")
    const [translatedWord, setTranslatedWord] = useState<string>("")

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add new card</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl>
                <FormLabel>Foreign Word</FormLabel>
                <Input placeholder='Enter the word' />
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>Translated Word</FormLabel>
                <Input placeholder='Enter the word' />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={onClose}> Add Item </Button>
                <Button variant='ghost' onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}