import { useState } from "react"
import { useQuery } from "react-query"
import { Box, Card, Flex, Progress, Text } from "@chakra-ui/react"
import { IconAdjustmentsHorizontal, IconChevronLeft } from "@tabler/icons-react"
import { useSwipeable } from "react-swipeable"
import { PageHeading } from "../components/PageHeading"
import { FlippableFlashCard } from "../components/FlippableFlashCard/FlippableFlashCard"
import { getCards } from "../services/CardService"
import { Loading } from "../components/Loading"

export const LearnPage = () => {
    const [currentWord, setCurrentWord] = useState<number>(1);

    const { isLoading: cardsLoading, data: flashCards } = useQuery('cards', getCards);

    const canGoToNext: boolean = currentWord < (flashCards?.length ?? -1);
    const canGoToPrevious: boolean = currentWord > 1;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => { if(canGoToNext) setCurrentWord(currentWord + 1) },
        onSwipedRight: () => { if(canGoToPrevious) setCurrentWord(currentWord - 1) },
    });

    const currentFlashCard = () => flashCards![currentWord - 1];

    return (
        <Flex direction='column' h='100%'>
            <PageHeading title="Learn" />
            {cardsLoading && <Loading />}

            {!cardsLoading && (
            <>
            <Flex h='100%' direction='column' justify='space-between' px={4} pb={8} {...swipeHandlers}>
                <Flex justify='space-between' align='center'>
                    <Flex align='center' gap={2}>
                        <Flex h='100%'>
                            <IconChevronLeft />
                        </Flex>
                        <Text>Italiano</Text>
                    </Flex>
                    <IconAdjustmentsHorizontal />
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
                    <Text opacity={0.7} fontSize='sm' alignSelf='end'>{currentWord} / {flashCards!.length}</Text>
                    <Progress value={currentWord} max={flashCards!.length} colorScheme="teal" w='100%' borderRadius='md' />
                </Flex>
            </Flex>
            </>)}
        </Flex>
    )
}