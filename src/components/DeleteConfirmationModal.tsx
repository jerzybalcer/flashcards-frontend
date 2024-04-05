import { Button, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import { FlashCard } from "../model/FlashCard";
import {deleteCard} from "../services/CardService"
import { useState } from "react";
import { AxiosError } from "axios";

interface DeleteConfirmationModalProps{
    isOpen: boolean;
    flashCard: FlashCard;
    onConfirm: () => void;
    onClose: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, flashCard, onClose }) => {
    const [isCardDeleting, setIsCardDeleting] = useState<boolean>(false)

    const toast = useToast();

    const handleDeleteCard = async() => {
        setIsCardDeleting(true);
        deleteCard(flashCard.id as number)
            .then(() => {
                toast({
                    title: 'Succesfully deleted card',
                    description: `${flashCard.foreignWord} - ${flashCard.translatedWord}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                });

                onClose();
                // refreshCardList();
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
                setIsCardDeleting(false);
            })
    }

    return (
            <Modal isOpen={isOpen} onClose={() => onClose()} autoFocus={false} returnFocusOnClose={false}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>You're about to permanently delete this flashcard from your list:</Text>
                        <br/>
                        <Card variant='outline' p={2} gap={2}>
                            <Text fontWeight='bold'>{flashCard.foreignWord}</Text>
                            <Text fontWeight='bold'>{flashCard.translatedWord}</Text>
                        </Card>
                        <br/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={() => handleDeleteCard()} isLoading={isCardDeleting}>Delete</Button>
                        <Button variant='ghost' onClick={() => onClose()}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
        </Modal>
    )
}
