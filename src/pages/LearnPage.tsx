import { useState } from "react"
import { Box, Button, Card, Flex } from "@chakra-ui/react"
import { useSwipeable } from "react-swipeable"
import { PageHeading } from "../components/PageHeading"
import { FlippableFlashCard } from "../components/FlippableFlashCard/FlippableFlashCard"
import { useLocation } from "react-router-dom"
import { ProgressBar } from "../components/ProgressBar"

export const LearnPage = () => {
    const [currentWord, setCurrentWord] = useState<number>(1);

    const { state } = useLocation();

    const canGoNext: boolean = currentWord < (state.cards.length ?? -1);
    const canGoPrevious: boolean = currentWord > 1;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => tryGoNext(),
        onSwipedRight: () => tryGoBack(),
    });

    const tryGoNext = () => { if(canGoNext) setCurrentWord(currentWord + 1) };
    const tryGoBack = () => { if(canGoPrevious) setCurrentWord(currentWord - 1) };

    const currentFlashCard = () => state.cards![currentWord - 1];

    return (
        <Flex direction='column' h='100%'>
            <PageHeading title="Learn" canGoBack />

            <Flex h='100%' direction='column' justify='space-between' px={4} pb={2} {...swipeHandlers}>
                <ProgressBar currentValue={currentWord} maxValue={state.cards.length} />

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
            </Flex>
        </Flex>
    )
}