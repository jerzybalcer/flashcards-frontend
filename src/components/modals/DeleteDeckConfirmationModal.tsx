import { Box, Button, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { errorToast, infoToast } from "../../utils/toasts";
import { Deck } from "../../model/Deck";
import { useNavigate } from "react-router-dom";
import { QueryKeys } from "../../hooks/queries/queryKeys";
import { useDeleteDeck } from "../../hooks/mutations/useDeleteDeck";

interface DeleteDeckConfirmationModalProps{
    isOpen: boolean;
    deck: Deck;
    onClose: () => void;
}

export const DeleteDeckConfirmationModal: React.FC<DeleteDeckConfirmationModalProps> = ({ isOpen, deck, onClose }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteDeck = useDeleteDeck();

    const handleDeleteSuccess = () => {
        onClose(); 
        queryClient.invalidateQueries(QueryKeys.allDecks);
        navigate('/decks');
        infoToast('Deck deleted', `${deck.name}`);
    };

    const handleDeleteError = (error: AxiosError) => errorToast(error.response?.data as string);

    const deleteMutation = useMutation((id: number) => deleteDeck(id), 
    {
        onSuccess: handleDeleteSuccess,
        onError: handleDeleteError,
    });

    const handleDeleteCard = async () => {
        deleteMutation.mutate(deck.id as number);
    };

    return (
            <Modal isOpen={isOpen} onClose={() => onClose()} autoFocus={false} returnFocusOnClose={false} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>You're about to permanently delete this deck from your list:</Text>
                        <br/>
                        <Card variant='outline' p={2} gap={2}>
                            <Box>
                                <Tag size='sm' colorScheme="blue" variant='subtle'>{deck.languageName.toUpperCase()}</Tag>
                            </Box>
                            <Text fontWeight='bold' fontSize='lg'>{deck.name}</Text>
                            <Text opacity={0.8}>{deck.cardsCount} flashcards</Text>
                        </Card>
                        <br/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={4} onClick={() => handleDeleteCard()} isLoading={deleteMutation.isLoading}>Delete</Button>
                        <Button variant='ghost' onClick={() => onClose()}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
        </Modal>
    )
}
