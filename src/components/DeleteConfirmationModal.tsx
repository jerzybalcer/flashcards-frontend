import { Button, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { FlashCard } from "../model/FlashCard";
import { deleteCard } from "../services/CardService";
import { errorToast, infoToast } from "../utils/toasts";

interface DeleteConfirmationModalProps{
    isOpen: boolean;
    flashCard: FlashCard;
    onClose: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, flashCard, onClose }) => {
    const queryClient = useQueryClient();

    const handleDeleteSuccess = () => {
        onClose(); 
        queryClient.invalidateQueries('cards'); 
        infoToast('Card deleted', `${flashCard.foreignWord} - ${flashCard.translatedWord}`);
    };

    const handleDeleteError = (error: AxiosError) => errorToast(error.response?.data as string);

    const deleteMutation = useMutation((id: number) => deleteCard(id), 
    {
        onSuccess: handleDeleteSuccess,
        onError: handleDeleteError,
    });

    const handleDeleteCard = async () => {
        deleteMutation.mutate(flashCard.id as number);
    };

    return (
            <Modal isOpen={isOpen} onClose={() => onClose()} autoFocus={false} returnFocusOnClose={false} isCentered>
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
                        <Button colorScheme="red" mr={3} onClick={() => handleDeleteCard()} isLoading={deleteMutation.isLoading}>Delete</Button>
                        <Button variant='ghost' onClick={() => onClose()}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
        </Modal>
    )
}
