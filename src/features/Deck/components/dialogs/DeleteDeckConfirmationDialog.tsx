import { Box, Button, Card, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { errorToast, infoToast } from "@/shared/utils/toasts";
import { Deck } from "@/model/Deck";
import { deleteDeck } from "@/shared/services/DeckService";
import { useNavigate } from "react-router-dom";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { IconTrash } from "@tabler/icons-react";

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

    const handleDeleteDeck = async () => {
        deleteMutation.mutate(deck.id as number);
    };

    return (
            <Modal isOpen={isOpen} onClose={() => onClose()} autoFocus={false} returnFocusOnClose={false} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader fontSize='h2'>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize='t2'>You're about to permanently delete this deck from your list:</Text>
                        <br/>
                        <Card variant='outline' p={2} gap={2} borderRadius='xl'>
                            <Box>
                                <Tag colorScheme="blue" variant='subtle'>{deck.languageName.toUpperCase()}</Tag>
                            </Box>
                            <Flex ml={2} direction='column' gap={1}>
                                <Text fontWeight='bold' fontSize='t1'>{deck.name}</Text>
                                <Text fontSize='bd'>{deck.cardsCount} flashcards</Text>
                            </Flex>
                        </Card>
                        <br/>
                    </ModalBody>

                    <ModalFooter display='flex' flexDirection='column' gap={2} justifyContent='space-between' alignItems='center'>
                        <Button w='100%' py={6} mt={2} fontSize='lg' borderRadius='xl' colorScheme="red" leftIcon={<IconTrash />} onClick={() => handleDeleteDeck()} isLoading={deleteMutation.isLoading}>Delete</Button>
                        <Button w='100%' py={6} mt={2} fontSize='lg' borderRadius='xl' variant='outline' onClick={() => onClose()}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
        </Modal>
    )
}
