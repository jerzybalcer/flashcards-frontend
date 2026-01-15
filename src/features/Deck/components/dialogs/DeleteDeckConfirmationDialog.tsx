import { Box, Button, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { errorToast, infoToast } from "@/shared/utils/toasts";
import { Deck } from "@/model/Deck";
import { deleteDeck } from "@/shared/services/DeckService";
import { useNavigate } from "react-router-dom";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";

interface Props{
    isOpen: boolean;
    deck: Deck;
    onClose: () => void;
}

export const DeleteDeckConfirmationDialog: React.FC<Props> = ({ isOpen, deck, onClose }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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
                            <Box ml={2}>
                                <Text fontWeight='bold' fontSize='lg'>{deck.name}</Text>
                                <Text opacity={0.8}>{deck.cardsCount} flashcards</Text>
                            </Box>
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
