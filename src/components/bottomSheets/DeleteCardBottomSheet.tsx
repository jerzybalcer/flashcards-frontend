import { Box, Card, Flex, Tag, Text } from "@chakra-ui/react";
import { BottomSheet } from "./BottomSheet";
import { FlashCard } from "../../model/FlashCard";
import { useDeleteCard } from "../../hooks/mutations/useDeleteCard";
import { useParams } from "react-router-dom";

interface Props {
    isOpen: boolean;
    flashCard: FlashCard;
    foreignLanguageName: string;
    onClose: () => void;
}

export const DeleteCardBottomSheet: React.FC<Props> = ({ isOpen, flashCard, foreignLanguageName, onClose }) => {
    const { deckId } = useParams();
    const { handleDeleteCard, isLoading } = useDeleteCard(Number(deckId), flashCard);

    function handleConfirm(){
        handleDeleteCard().then(() => onClose());
    }

    function getHeader() {
        return <Text fontWeight='bold'>Are you sure?</Text>;
    }

    function getBody() {
        return ([
            <Text>You're about to permanently delete this flashcard from your deck:</Text>,
            <Card variant='outline' p={2} gap={4} my={2}>
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
            </Card>,
        ]);
    }

    return <BottomSheet 
        isOpen={isOpen} 
        header={[getHeader()]} 
        body={getBody()} 
        confirmText="Delete" 
        canClose 
        onClose={onClose} 
        onConfirm={handleConfirm} 
        isConfirmLoading={isLoading}
        isConfirmDeleting
    />;
}