import { useEffect, useRef, useState } from "react";
import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from "react-query";
import { addCard, editCard} from "../services/CardService"
import { FlashCard } from "../model/FlashCard";
import { errorToast, successToast } from "../utils/toasts";

interface AddCardModalProps {
    isOpen: boolean;
    flashCard?: FlashCard;
    onClose: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, flashCard, onClose }) => {
    const [foreignWord, setForeignWord] = useState<string>("");
    const [translatedWord, setTranslatedWord] = useState<string>("");
    const mutationFunction = useRef<(card: FlashCard) => Promise<unknown>>();
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        successToast('Succesfully saved card', `${foreignWord} - ${translatedWord}`);
        setTranslatedWord('');
        setForeignWord('');
        onClose();
        queryClient.invalidateQueries('cards');
    };

    const handleError = (error: AxiosError) => {
        errorToast(error.response?.data as string);
    };

    const mutation = useMutation((card: FlashCard) => mutationFunction.current!(card), 
    {
        onSuccess: handleSuccess,
        onError: handleError,
    });

    const handleAddCard = async () => {
        const newFlashCard = 
        {
            foreignWord: foreignWord,
            translatedWord: translatedWord,
            id: flashCard ? flashCard.id : undefined
        } as FlashCard;

        mutation.mutate(newFlashCard);
    }

    useEffect(() => {
        if(!flashCard){
            mutationFunction.current = addCard;
        }
        else{
            mutationFunction.current = editCard;
            setForeignWord(flashCard.foreignWord);
            setTranslatedWord(flashCard.translatedWord);
        }
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
                <Button colorScheme='teal' mr={3} onClick={() => handleAddCard()} isLoading={mutation.isLoading}> {flashCard ? 'Edit Item' : 'Add Item'} </Button>
                <Button variant='ghost' onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

