import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FlashCard } from './../model/FlashCard';
import { FlashCardListElement } from "./FlashCardListElement/FlashCardListElement";
import { Loading } from "./Loading";

interface FlashCardListProps {
    cards: FlashCard[] | undefined;
    cardsLoading: boolean;
    onAddCardModalOpen: (flashCard?: FlashCard) => void;
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ cards, cardsLoading, onAddCardModalOpen }) => {
    const [currentCards, setCurrentCards] = useState<FlashCard[]>([]);

    useEffect(() => {
        if(cards)
        setCurrentCards(cards)
    }, [cards]);

    return (
        <Box>
            {cardsLoading && <Loading />}
            {!cardsLoading && 
            <Flex flexDirection='column' h='100%' overflowY='visible' overflowX='hidden' gap={4}>
                {currentCards.map((obj: FlashCard, index: number) => 
                <FlashCardListElement key={index} flashCard={obj} onEdit={(currentFlashCard) => onAddCardModalOpen(currentFlashCard)}/>
                )}
            </Flex>
            }
        </Box>
    )
}