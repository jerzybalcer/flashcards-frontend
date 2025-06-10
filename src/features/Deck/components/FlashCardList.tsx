import { useEffect, useRef } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { FlashCard } from "@/model/FlashCard";
import { SortCardsSettings } from "@/model/SortCardsSettings";
import { Loading } from "@/shared/components/Loading";
import { Scrollable } from "@/shared/components/Scrollable";
import { useScrollToBottom } from "@/shared/hooks/general/useScrollToBottom";
import { useCards } from "@/shared/hooks/queries/useCards";
import { useParams } from "react-router-dom";
import { FlashCardListElement } from "./FlashCardListElement";


interface Props {
    onEditCardFormOpen: (flashCard: FlashCard) => void;
    searchText: string;
    sortSettings: SortCardsSettings;
    foreignLanguageName: string;
}

export const FlashCardList: React.FC<Props> = ({ onEditCardFormOpen, searchText, sortSettings, foreignLanguageName }) => {
    const { deckId } = useParams();

    const listRef = useRef<HTMLDivElement>(null);

    const { isFetchingNextPage: cardsLoading, data: cardsResponse, fetchNextPage, hasNextPage } = useCards(Number(deckId), searchText ?? null, undefined, sortSettings.sortBy, sortSettings.direction);

    function handleScrollToBottom(){
        if(hasNextPage && !cardsLoading){
            fetchNextPage();
        }
    }

    useScrollToBottom(listRef, handleScrollToBottom);

    const cards = cardsResponse?.pages?.flatMap(p => p.items) ?? [];

    useEffect(() => {
        if(!searchText && !sortSettings){
            return
        } 
        listRef.current?.scrollTo({ top: 0 });
    }, [searchText, sortSettings]);

    return (
        <Box h='100%'>
            <Flex flexDirection='column' h='100%' gap={4}>
                <Box w='100%' flexGrow={1}>
                    {cards.length === 0 
                    ? <Center h='100%' opacity={0.8}>No flashcards to show.</Center>
                    : <Scrollable scrollableRef={listRef}>
                        <>
                        {cards.map((obj: FlashCard, index: number) => <FlashCardListElement key={index} flashCard={obj} onEdit={(currentFlashCard) => onEditCardFormOpen(currentFlashCard)} foreignLanguageName={foreignLanguageName}/>
                        )}
                        </>
                        <Box mt={2}>
                            {!hasNextPage && <Center as='p' opacity={0.8}>You've seen all flashcards.</Center>}
                            <Box opacity={cardsLoading ? 1 : 0}>
                                <Loading />
                            </Box>
                        </Box>
                    </Scrollable>
                    }
                </Box>
            </Flex>
        </Box>
    )
}