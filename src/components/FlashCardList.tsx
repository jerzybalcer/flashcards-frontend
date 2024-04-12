import { useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FlashCard } from './../model/FlashCard';
import { FlashCardListElement } from "./FlashCardListElement/FlashCardListElement";
import { Pagination } from "./Pagination";
import { Loading } from "./Loading";

interface FlashCardListProps {
    cards: FlashCard[] | undefined;
    cardsLoading: boolean;
    onAddCardModalOpen: (flashCard?: FlashCard) => void;
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ cards, cardsLoading, onAddCardModalOpen }) => {

    const [currentCards, setCurrentCards] = useState<FlashCard[]>([]);

    const listRef = useRef<HTMLDivElement>(null);


    const handlePageChange = (currentPage: FlashCard[]) => {
        setCurrentCards(currentPage)
        listRef.current?.scrollTo({ top: 0 });
    }

    return (
        <Box h='100%'>
            {cardsLoading && <Loading />}
            {!cardsLoading && 
            <Flex flexDirection='column' h='100%' gap={4}>
                <Flex h='60%' overflowY='auto' overflowX='hidden' direction='column' ref={listRef} pr={2}>
                    {currentCards.map((obj: FlashCard, index: number) => <FlashCardListElement key={index} flashCard={obj} onDelete={() => {}} onEdit={(currentFlashCard) => onAddCardModalOpen(currentFlashCard)}/>)}
                </Flex>
                <Pagination items={cards!} itemsPerPage={20} onPageChange={(currentPage) => handlePageChange(currentPage as FlashCard[])}/>
            </Flex>
            }
        </Box>
    )
}