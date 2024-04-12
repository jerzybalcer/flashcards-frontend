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
                <Flex ref={listRef} overflowY='scroll' overflowX='hidden' direction='column' flexGrow={1} position='relative' >
                    <Flex position='absolute' direction='column' w='100%' pr={2}>
                        {currentCards.map((obj: FlashCard, index: number) => <FlashCardListElement key={index} flashCard={obj} onEdit={(currentFlashCard) => onAddCardModalOpen(currentFlashCard)}/>)}
                    </Flex>
                </Flex>
                <Box flexGrow={0}>
                    <Pagination items={cards!} itemsPerPage={20} onPageChange={(currentPage) => handlePageChange(currentPage as FlashCard[])} />
                </Box>
            </Flex>
            }
        </Box>
    )
}