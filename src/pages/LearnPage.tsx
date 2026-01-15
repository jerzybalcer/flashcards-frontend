import { useState } from "react"
import { Flex } from "@chakra-ui/react"
import { useSwipeable } from "react-swipeable"
import { PageHeading } from "@/shared/components/PageHeading"
import { useNavigate, useParams } from "react-router-dom"
import { Loading } from "../shared/components/Loading"
import { useCards } from "@/shared/hooks/queries/useCards"
import { useDeck } from "@/shared/hooks/queries/useDeck"
import { SortCardsBy } from "../model/SortCardsBy"
import { LearnContent } from "@/features/Learn/components/LearnContent"
import { LearnHeader } from "@/features/Learn/components/LearnHeader"
import { LearnNavigation } from "@/features/Learn/components/LearnNavigation"

export const LearnPage = () => {
    const [currentCardNumber, setCurrentWord] = useState<number>(1);

    const { deckId } = useParams();

    const { isFetching: deckLoading, data: deck } = useDeck(Number(deckId));

    const { isFetching: cardsLoading, data: cardsResponse } = useCards(Number(deckId), null, 9999, SortCardsBy.DateAdded, 'descending');

    const cards = cardsResponse?.pages?.flatMap(p => p.items) ?? [];

    const canGoNext: boolean = !cardsLoading && (currentCardNumber < cards!.length);
    const canGoPrevious: boolean = currentCardNumber > 1;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => tryGoNext(),
        onSwipedRight: () => tryGoBack(),
    });

    const navigate = useNavigate();

    const tryGoNext = () => { 
        if(canGoNext) setCurrentWord(currentCardNumber + 1);
        else navigate(`/decks/${deckId}`);
    };
    const tryGoBack = () => { if(canGoPrevious) setCurrentWord(currentCardNumber - 1) };

    const currentFlashCard =  cards![currentCardNumber - 1];

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Learn" urlToGoBack={`/decks/${deckId}`} />

            {(cardsLoading || deckLoading) && <Loading />}
            {!cardsLoading && !deckLoading && cards && deck &&
            (
            <Flex flexGrow={1} direction='column' justify='space-between' px={4} pb={2} {...swipeHandlers}>
                <LearnHeader currentCardNumber={currentCardNumber} cardsCount={cards.length}/>
                <LearnContent flashcard={currentFlashCard} foreignLanguageId={deck.languageId} />
                <LearnNavigation isPreviousEnabled={canGoPrevious} onPreviousClick={tryGoBack} onNextClick={tryGoNext} isNextEnabled={canGoNext} />
            </Flex>
            )}
        </Flex>
    )
}