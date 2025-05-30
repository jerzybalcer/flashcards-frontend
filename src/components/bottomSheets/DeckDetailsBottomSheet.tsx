import { IconEdit, IconTrash, IconVocabulary } from "@tabler/icons-react";
import { BottomSheet } from "./BottomSheet";
import { Flex, Box, Center, IconButton, Text, Tag } from "@chakra-ui/react";
import { Deck } from "../../model/Deck";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    deck: Deck;
    onDelete: () => void;
}

export const DeckDetailsBottomSheet: React.FC<Props> = ({ isOpen, onClose, deck, onDelete }) => {

    function getHeader() {
        return <Flex justify='space-between' align='center' w='100%'>
            <Box flex={1}/>
            <Center>
                <IconVocabulary size={60} />
            </Center>
            <Flex flex={1} justify='right'>
                <IconButton colorScheme="red" icon={<IconTrash />} aria-label="delete" onClick={onDelete} />
            </Flex>
        </Flex>;
    }

    function getBody() {
        return <Flex direction='column' justify='space-between' align='center' gap='28px'>
            <Flex direction='column' justify='space-between' align='center' gap='10px'>
                    <Tag colorScheme="blue" variant='subtle'>{deck.languageName.toUpperCase()}</Tag>
                <Flex gap={2} align='center' justify='space-between'>
                <Text display='inline-block' lineHeight='100%' fontSize={32} userSelect='text'>{deck.name}</Text>
                </Flex>
                    <Text display='inline-block' lineHeight='100%' fontSize={24} userSelect='text' color='blue.200'>{deck.cardsCount} {deck.cardsCount == 1 ? 'flashcard' : 'flashcards'}</Text>
            </Flex>
        </Flex>;
    }

    function handleEdit() {

    }

    return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} confirmText="Edit" confirmIcon={<IconEdit />} onConfirm={handleEdit} onClose={onClose}/>
}