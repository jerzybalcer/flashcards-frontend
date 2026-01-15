import { IconEdit, IconSwipe, IconTrash } from "@tabler/icons-react";
import { Box, Center, Flex, IconButton, Text } from "@chakra-ui/react";
import { FlashCard } from "../../../../model/FlashCard";
import { BottomSheet } from "@/shared/components/BottomSheet";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    flashCard: FlashCard;
    onEdit: () => void;
    onDelete: () => void;
}

export const FlashCardDetailsBottomSheet: React.FC<Props> = ({ isOpen, onClose, flashCard, onEdit, onDelete }) => {
    function getHeader() {
        return <Flex justify='space-between' align='center' w='100%'>
            <Box flex={1}/>
            <Center>
                <IconSwipe size={60} />
            </Center>
            <Flex flex={1} justify='right'>
                <IconButton colorScheme="red" icon={<IconTrash />} aria-label="delete" onClick={() => handleDelete()} />
            </Flex>
        </Flex>;
    }

    function getBody() {
        return <Flex direction='column' justify='space-between' align='center' gap='28px'>
            <Flex direction='column' justify='space-between' align='center' gap='10px'>
                <Text display='inline-block' lineHeight='100%' fontSize={32} userSelect='text'>{flashCard.foreignWord}</Text>
                <Text display='inline-block' lineHeight='100%' fontSize={24} userSelect='text' color='blue.200'>{flashCard.translatedWord}</Text>
            </Flex>
            <Flex direction='column' justify='space-between' align='center' gap='10px' borderColor='blue.200' borderStyle='solid' borderWidth="1px" borderRadius='md' p='10px' w='100%'>
                <Text display='inline-block' lineHeight='28px' fontSize={16} fontWeight={600} userSelect='text'>{flashCard.foreignExampleSentence ?? 'No example sentence'}</Text>
                <Text display='inline-block' lineHeight='28px' fontSize={16} fontWeight={600} userSelect='text' color='blue.200'>{flashCard.translatedExampleSentence ?? 'Edit flashcard to add one'}</Text>
            </Flex>
        </Flex>;
    }

    function handleEdit(){
        onEdit();
    }

    function handleDelete(){
        onDelete();
    }

    return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} onConfirm={handleEdit} confirmText="Edit" confirmIcon={<IconEdit />} onClose={onClose}/>
}