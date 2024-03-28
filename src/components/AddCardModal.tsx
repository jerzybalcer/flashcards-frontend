import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import {Button} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import {addCard, editCard} from "../services/CardService"
import { FlashCard } from "../model/FlashCard";
import { AxiosError } from 'axios';

interface AddCardModalProps {
    isOpen: boolean;
    flashCard?: FlashCard;
    onClose: () => void;
    refreshCardList: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, flashCard, onClose, refreshCardList }) => {
    const [foreignWord, setForeignWord] = useState<string>("")
    const [translatedWord, setTranslatedWord] = useState<string>("")
    const [isCardAdding, setIsCardAdding] = useState<boolean>(false)

    const toast = useToast()

    const handleAddCard = async () => {
        setIsCardAdding(true);

        const card = 
        {
            foreignWord: foreignWord,
            translatedWord: translatedWord,
            id: flashCard ? flashCard.id : undefined
        } as FlashCard;
        
        let promise;

        if (!flashCard) promise = addCard(card) 
        else promise = editCard(card)

        promise
            .then(() => {
                toast({
                    title: 'Succesfully saved card',
                    description: `${foreignWord} - ${translatedWord}`,
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

    useEffect(() => {
        if(!flashCard) return;

        setForeignWord(flashCard.foreignWord);
        setTranslatedWord(flashCard.translatedWord);
    }, [flashCard]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} returnFocusOnClose={false}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{flashCard ? 'Edit card' : 'Add new card'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isRequired>
                <FormLabel>Foreign Word</FormLabel>
                <Input maxLength={100} placeholder='Enter the word'
                    defaultValue={flashCard?.foreignWord ?? ''} onChange={(event) => setForeignWord(event.target.value)} />
                </FormControl>

                <FormControl mt={4} isRequired>
                <FormLabel>Translated Word</FormLabel>
                <Input maxLength={100} placeholder='Enter the word' defaultValue={flashCard?.translatedWord ?? ''}
                    onChange={(event) => setTranslatedWord(event.target.value)} />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={() => handleAddCard()} isLoading={isCardAdding}> {flashCard ? 'Edit Item' : 'Add Item'} </Button>
                <Button variant='ghost' onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

