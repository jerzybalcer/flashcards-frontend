import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import {Button} from "@chakra-ui/react"
import { useState } from "react";
import {addCard} from "../services/CardService"
import { FlashCard } from "../model/FlashCard";
import { AxiosError } from 'axios';

interface AddCardModalProps {
    isOpen: boolean;    
    onClose: () => void;
    refreshCardList: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, refreshCardList }) => {
    const [foreignWord, setForeignWord] = useState<string>("")
    const [translatedWord, setTranslatedWord] = useState<string>("")
    const [isCardAdding, setIsCardAdding] = useState<boolean>(false)

    const toast = useToast()

    const handleAddCard = async () => {
        setIsCardAdding(true);

        const card = 
        {
            foreignWord: foreignWord,
            translatedWord: translatedWord
        } as FlashCard;

        addCard(card)
            .then(() => {
                toast({
                    title: 'Card added',
                    description: `Added: ${foreignWord} - ${translatedWord}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                  });

                onClose();
                refreshCardList();
                setTranslatedWord('');
                setForeignWord('')
            })
            .catch((err: AxiosError) => {
                toast({
                    title: 'Error',
                    description: err.response?.data as string,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                  });
            })
            .finally(() => {
                setIsCardAdding(false);
            })
    } 

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt='50%'>
            <ModalHeader>Add new card</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isRequired>
                <FormLabel>Foreign Word</FormLabel>
                <Input maxLength={100} placeholder='Enter the word' value={foreignWord} onChange={(event) => setForeignWord(event.target.value)} />
                </FormControl>

                <FormControl mt={4} isRequired>
                <FormLabel>Translated Word</FormLabel>
                <Input maxLength={100} placeholder='Enter the word' value={translatedWord} onChange={(event) => setTranslatedWord(event.target.value)} />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={handleAddCard} isLoading={isCardAdding}> Add Item </Button>
                <Button variant='ghost' onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

