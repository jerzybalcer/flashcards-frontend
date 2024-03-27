import { Button, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { FlashCard } from "../model/FlashCard";

interface DeleteConfirmationModalProps{
    isOpen: boolean;
    flashCard: FlashCard;
    onConfirm: () => void;
    onClose: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, flashCard, onConfirm, onClose }) => {
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
                        <Button colorScheme="red" mr={3} onClick={() => onConfirm()}>Delete</Button>
                        <Button variant='ghost' onClick={() => onClose()}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
        </Modal>
    )
}