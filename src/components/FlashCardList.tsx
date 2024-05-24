import { useEffect, useRef, useState } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { FlashCard } from './../model/FlashCard';
import { FlashCardListElement } from "./FlashCardListElement/FlashCardListElement";
// import { Pagination } from "./Pagination";
import { Loading } from "./Loading";
import { Scrollable } from "./Scrollable";

interface FlashCardListProps {
    cards: FlashCard[] | undefined;
    cardsLoading: boolean;
    onAddCardModalOpen: (flashCard?: FlashCard) => void;
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ cards, cardsLoading, onAddCardModalOpen }) => {
    const [currentCards, setCurrentCards] = useState<FlashCard[]>([]);

    const listRef = useRef<HTMLDivElement>(null);

    // const handlePageChange = (currentPage: FlashCard[]) => {
    //     setCurrentCards(currentPage)
    //     listRef.current?.scrollTo({ top: 0 });
    // }

    useEffect(() => {
        if(cards)
        setCurrentCards(cards)
    }, [cards]);

    return (
        <Box h='100%'>
            {cardsLoading && <Loading />}
            {!cardsLoading && 
            <Flex flexDirection='column' h='100%' gap={4}>
                <Box w='100%' flexGrow={1}>
                    {currentCards.length === 0 
                    ? <Center h='100%' opacity={0.8}>No flashcards to show.</Center>
                    : <Scrollable scrollableRef={listRef}>
                        {currentCards.map((obj: FlashCard, index: number) => <FlashCardListElement key={index} flashCard={obj} onEdit={(currentFlashCard) => onAddCardModalOpen(currentFlashCard)}/>
                        )}
                    </Scrollable>
                    }
                </Box>
                {/* <Box flexGrow={0}>
                    <Pagination items={cards!} itemsPerPage={20} onPageChange={(currentPage) => handlePageChange(currentPage as FlashCard[])} />
                </Box> */}
            </Flex>
            }
        </Box>
    )
}