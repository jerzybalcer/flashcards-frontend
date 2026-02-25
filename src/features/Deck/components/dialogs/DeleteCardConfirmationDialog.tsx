import { FlashCard } from "@/model/FlashCard";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { deleteCard } from "@/shared/services/CardService";
import { successToast } from "@/shared/utils/toasts";
import { Box, Button, Card, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text } from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";


interface Props{
    isOpen: boolean;
    flashCard: FlashCard;
    foreignLanguageName: string;
    onClose: () => void;
}

export const DeleteCardConfirmationDialog: React.FC<Props> = ({ isOpen, flashCard, foreignLanguageName, onClose }) => {
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
                    <ModalHeader fontSize='h2'>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize='t2'>You're about to permanently delete this flashcard from your deck:</Text>
                        <br/>
                        <Card variant='outline' p={2} gap={4} borderRadius='xl'>
                            <Flex direction='column' gap={2}>
                                <Box>
                                    <Tag colorScheme="blue" variant='subtle'>{foreignLanguageName.toUpperCase()}</Tag>
                                </Box>
                                <Text fontSize='t1' fontWeight={600} color='blue.200' ml={2}>{flashCard.foreignWord}</Text>
                            </Flex>
                            <Flex direction='column' gap={2}>
                                <Box>
                                    {/* TODO: use user's nativeLanguage */}
                                    <Tag colorScheme="gray" variant='subtle'>POLISH</Tag>
                                </Box>
                                <Text fontSize='t1' fontWeight={600} ml={2}>{flashCard.translatedWord}</Text>
                            </Flex>
                        </Card>
                        <br/>
                    </ModalBody>

                    <ModalFooter display='flex' flexDirection='column' gap={2} justifyContent='space-between' alignItems='center'>
                        <Button w='100%' py={6} mt={2} fontSize='lg' borderRadius='xl' colorScheme="red" leftIcon={<IconTrash />} onClick={() => handleDeleteCard()} isLoading={deleteMutation.isLoading}>Delete</Button>
                        <Button w='100%' py={6} mt={2} fontSize='lg' borderRadius='xl' variant='outline' onClick={() => onClose()}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
        </Modal>
    )
}
