import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { FlashCard } from './../model/FlashCard';
import { FlashCardListElement } from "./FlashCardListElement/FlashCardListElement";
import { Pagination } from "./Pagination";
import { Loading } from "./Loading";

interface FlashCardListProps {
    cards: FlashCard[] | undefined;
    cardsLoading: boolean;
    searchPhrase: string;
    onAddCardModalOpen: (flashCard?: FlashCard) => void;
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ cards, cardsLoading, searchPhrase, onAddCardModalOpen }) => {

    const [currentCards, setCurrentCards] = useState<FlashCard[]>([]);
    const listRef = useRef<HTMLDivElement>(null);

    // @ts-ignore
    const search = (cards: FlashCard[]) => {
        return cards.filter(c => 
            c.foreignWord.toLowerCase().includes(searchPhrase.toLowerCase())
            || 
            c.translatedWord.toLowerCase().includes(searchPhrase.toLowerCase())
        )
    }

    const handlePageChange = (currentPage: FlashCard[]) => {
        setCurrentCards(currentPage)
        listRef.current?.scrollTo({ top: 0 });
    }

    return (
        <Box px={4} h='100%'>
            {cardsLoading && <Loading />}
            {!cardsLoading && 
            <Flex flexDirection='column' h='100%' gap={4}>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Heading size='md' opacity={0.8}>{cards?.length ?? 0} flashcards</Heading>
                    <Button colorScheme="teal" onClick={() => onAddCardModalOpen()}>Add</Button>
                </Flex>
                <Flex h='75%' overflowY='auto' overflowX='hidden' direction='column' ref={listRef} id='flashCardList'>
                    {currentCards.map((obj: FlashCard, index: number) => <FlashCardListElement key={index} flashCard={obj} onDelete={() => {}} onEdit={(currentFlashCard) => onAddCardModalOpen(currentFlashCard)}/>)}
                </Flex>
                <Pagination items={cards!} itemsPerPage={20} onPageChange={(currentPage) => handlePageChange(currentPage as FlashCard[])}/>
            </Flex>
            }
        </Box>
    )
}