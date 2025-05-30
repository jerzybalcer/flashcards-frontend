import { Box, Button, Card, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { FlashCard } from "../../model/FlashCard";
import { deleteCard } from "../../services/CardService";
import { successToast } from "../../utils/toasts";
import { useParams } from "react-router-dom";
import { QueryKeys } from "../../hooks/queries/queryKeys";

interface DeleteCardConfirmationModalProps{
    isOpen: boolean;
    flashCard: FlashCard;
    foreignLanguageName: string;
    onClose: () => void;
}

export const DeleteCardConfirmationModal: React.FC<DeleteCardConfirmationModalProps> = ({ isOpen, flashCard, foreignLanguageName, onClose }) => {
    const queryClient = useQueryClient();
    const { deckId } = useParams();

    const handleDeleteSuccess = () => {
        onClose(); 
        queryClient.invalidateQueries({predicate: (query) => query.queryKey.includes(QueryKeys.cards) && (query.queryKey as number[]).includes(Number(deckId))}); 
        queryClient.invalidateQueries([QueryKeys.deck, Number(deckId)]);
        successToast('Card deleted', `${flashCard.foreignWord} - ${flashCard.translatedWord}`);
    };

    const deleteMutation = useMutation((id: number) => deleteCard(id), 
    {
        onSuccess: handleDeleteSuccess,
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
                        <Text>You're about to permanently delete this flashcard from your deck:</Text>
                        <br/>
                        <Card variant='outline' p={2} gap={4}>
                            <Flex direction='column' gap={2}>
                                <Box>
                                    <Tag colorScheme="blue" variant='subtle'>{foreignLanguageName.toUpperCase()}</Tag>
                                </Box>
                                <Text fontWeight='bold' color='blue.200' ml={2}>{flashCard.foreignWord}</Text>
                            </Flex>
                            <Flex direction='column' gap={2}>
                                <Box>
                                    <Tag colorScheme="gray" variant='subtle'>POLISH</Tag>
                                </Box>
                                <Text fontWeight='bold' ml={2}>{flashCard.translatedWord}</Text>
                            </Flex>
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
