import { IconEdit, IconTrash, IconVocabulary } from "@tabler/icons-react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { Flex, Box, Center, IconButton, Text, Tag } from "@chakra-ui/react";
import { Deck } from "../../../../model/Deck";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    deck: Deck;
    onDelete: () => void;
    onEdit: () => void;
}

export const DeckDetailsBottomSheet: React.FC<Props> = ({ isOpen, onClose, deck, onDelete, onEdit }) => {

    function getHeader() {
        return <Flex justify='space-between' align='center' w='100%'>
            <Box flex={1}/>
            <Center>
                <IconVocabulary size={60} />
            </Center>
            <Flex flex={1} justify='right'>
                <IconButton variant='outline' icon={<IconTrash />} aria-label="delete" onClick={onDelete} />
            </Flex>
        </Flex>;
    }

    function getBody() {
        return <Flex direction='column' justify='space-between' align='center' mb='30px'>
            <Flex direction='column' justify='space-between' align='center' gap={4}>
                <Flex direction='column' align='center' justify='space-between' gap={2}>
                    <Tag colorScheme="blue" variant='subtle'>{deck.languageName.toUpperCase()}</Tag>
                    <Text display='inline-block' lineHeight='100%' fontSize='h2' fontWeight={700} userSelect='text'>{deck.name}</Text>
                </Flex>
                <Text display='inline-block' lineHeight='100%' fontSize='t1' fontWeight={400} userSelect='text'>{deck.cardsCount} {deck.cardsCount == 1 ? 'flashcard' : 'flashcards'}</Text>
            </Flex>
        </Flex>;
    }

    function handleEdit() {
        onEdit();
    }

    return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} confirmText="Edit" confirmIcon={<IconEdit />} onConfirm={handleEdit} onClose={onClose}/>
}