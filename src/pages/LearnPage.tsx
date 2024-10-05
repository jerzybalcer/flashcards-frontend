import { useState } from "react"
import { Box, Button, Card, Flex } from "@chakra-ui/react"
import { useSwipeable } from "react-swipeable"
import { PageHeading } from "../components/PageHeading"
import { FlippableFlashCard } from "../components/FlippableFlashCard/FlippableFlashCard"
import { useParams } from "react-router-dom"
import { ProgressBar } from "../components/ProgressBar"
import { LearnSettingsModal } from "../components/modals/LearnSettingsModal"
import { Loading } from "../components/Loading"
import { useCards } from "../hooks/queries/useCards"

export const LearnPage = () => {
    const [currentWord, setCurrentWord] = useState<number>(1);

    const { deckId } = useParams();

    const { isFetching: cardsLoading, data: cards } = useCards(Number(deckId));

    const canGoNext: boolean = !cardsLoading && (currentWord < cards!.length);
    const canGoPrevious: boolean = currentWord > 1;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => tryGoNext(),
        onSwipedRight: () => tryGoBack(),
    });

    const tryGoNext = () => { if(canGoNext) setCurrentWord(currentWord + 1) };
    const tryGoBack = () => { if(canGoPrevious) setCurrentWord(currentWord - 1) };

    const currentFlashCard = () => cards![currentWord - 1];

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Learn" urlToGoBack={`/decks/${deckId}`} />

            {cardsLoading && <Loading />}
            {!cardsLoading && cards &&
            (<Flex flexGrow={1} direction='column' justify='space-between' px={4} pb={2} {...swipeHandlers}>
                <Flex gap={2}>
                    <LearnSettingsModal />
                    <ProgressBar currentValue={currentWord} maxValue={cards.length} />
                </Flex>

                <Flex direction='column' justify='space-between' align='center'>
                    <Flex w='80dvw' h='45dvh' position='relative' justify='center'>
                        <Card w='90%' h='100%' position='absolute' top={-6} filter='brightness(70%)'></Card>
                        <Card w='95%' h='100%' position='absolute' top={-3} filter='brightness(80%)'></Card>
                        <Box w='100%' h='100%' position='absolute'>
                            <FlippableFlashCard flashCard={currentFlashCard()} />
                        </Box>
                    </Flex>
                </Flex>

                <Flex w='100%' gap={2} align='center'>
                    <Button w='30%' py={6} fontSize='md' colorScheme="blue" borderRadius='xl' variant='ghost' isDisabled={!canGoPrevious} onClick={() => tryGoBack()}>Previous</Button>
                    <Button w='70%' py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' isDisabled={!canGoNext} onClick={() => tryGoNext()}>Continue</Button>
                </Flex>
            </Flex>)}
        </Flex>
    )
}