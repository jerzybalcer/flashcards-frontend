import { useState } from "react"
import { Box, Card, Flex, Heading, Progress, Text } from "@chakra-ui/react"
import { useSwipeable } from "react-swipeable"
import { PageHeading } from "../components/PageHeading"
import { FlippableFlashCard } from "../components/FlippableFlashCard/FlippableFlashCard"
import { useLocation } from "react-router-dom"
import { LearnSettings } from "../components/LearnSettings"

export const LearnPage = () => {
    const [currentWord, setCurrentWord] = useState<number>(1);

    const { state } = useLocation();

    const canGoToNext: boolean = currentWord < (state.cards.length ?? -1);
    const canGoToPrevious: boolean = currentWord > 1;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => { if(canGoToNext) setCurrentWord(currentWord + 1) },
        onSwipedRight: () => { if(canGoToPrevious) setCurrentWord(currentWord - 1) },
    });

    const currentFlashCard = () => state.cards![currentWord - 1];

    return (
        <Flex direction='column' h='100%'>
            <PageHeading canGoBack />

            <Flex h='100%' direction='column' justify='space-between' px={4} pb={8} {...swipeHandlers}>
                <Flex justify='space-between' align='center'>
                    <Flex direction='column' justify='center' gap={2}>
                        <Heading>Learning</Heading>
                        <Text opacity={0.8}>{state.deck.name}</Text>
                    </Flex>
                    <LearnSettings onAutoReadChange={() => {}} onDefaultSideChange={() => {}}/>
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

                <Flex w='100%' direction='column' gap={2}>
                    <Text opacity={0.7} fontSize='sm' alignSelf='end'>{currentWord} / {state.cards.length}</Text>
                    <Progress value={currentWord} max={state.cards.length} colorScheme="teal" w='100%' borderRadius='md' />
                </Flex>
            </Flex>
        </Flex>
    )
}