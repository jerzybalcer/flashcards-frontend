import React from "react";
import { Flex, Box, Tag, Heading } from "@chakra-ui/react";
import { Deck } from "@/model/Deck";
import { ThreeDotsButton } from "@/shared/components/ThreeDotsButton";

interface Props {
    deck: Deck;
    onDeckDetailsOpen: () => void;
}

export const DeckHeader: React.FC<Props> = ({ deck, onDeckDetailsOpen }) => {
  return <Flex direction='column' gap={2}>
            <Box>
                <Tag size='md' colorScheme="blue" variant='subtle'>{deck.languageName.toUpperCase()}</Tag>
            </Box>
            <Flex justify='space-between' align='center'>
                <Heading size='lg'>{deck.name}</Heading>
                <ThreeDotsButton onClick={onDeckDetailsOpen} />
            </Flex>
        </Flex>;
}
  