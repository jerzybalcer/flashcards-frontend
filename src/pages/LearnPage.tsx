import { useRef, useState } from "react"
import { useQuery } from "react-query"
import { Box, Card, Flex, Progress, Text } from "@chakra-ui/react"
import { IconChevronLeft, IconDotsVertical } from "@tabler/icons-react"
import { DndContext } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { PageHeading } from "../components/PageHeading"
import { FlippableFlashCard } from "../components/FlippableFlashCard/FlippableFlashCard"
import { getCards } from "../services/CardService"
import { Loading } from "../components/Loading"
import { Draggable } from "../components/Draggable"

export const LearnPage = () => {
    const [currentWord, setCurrentWord] = useState<number>(1);

    const { isLoading: cardsLoading, data: flashCards } = useQuery('cards', getCards);

    const canGoToNext: boolean = currentWord < (flashCards?.length ?? -1);
    const canGoToPrevious: boolean = currentWord > 1;

    const card1Ref = useRef<HTMLDivElement>(null);

    const handleDragEnd = () => {
        const { left: cardLeft, right: cardRight, width: cardWidth } = card1Ref.current!.getBoundingClientRect();

        const threshold = cardWidth * 0.2;

        if(cardLeft < -threshold){
            card1Ref.current!.style.transition = 'transform 1s';
            card1Ref.current!.style.transform = 'translateX(-10000px)';

            if(canGoToPrevious) setCurrentWord(currentWord - 1);
        }
        else if(cardRight > window.innerWidth + threshold) {
            card1Ref.current!.style.transition = 'transform 1s';
            card1Ref.current!.style.transform = 'translateX(10000px)';

            if(canGoToNext) setCurrentWord(currentWord + 1);
        }

        // Prevent the click event from reaching children
        // setTimeout(() => setIsDragging(false), 0);
    }

    const currentFlashCard = () => flashCards![currentWord - 1];

      
    return (
        <Flex direction='column' h='100%'>
            <PageHeading title="Learn" />
            {cardsLoading && <Loading />}

            {!cardsLoading && (
            <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToHorizontalAxis]}>
            <Flex h='100%' direction='column' justify='space-between' px={4} pb={8}>
                <Flex justify='space-between' align='center'>
                    <Flex align='center' gap={2}>   
                        <Flex h='100%'>
                            <IconChevronLeft />
                        </Flex>
                        <Text>Italiano</Text>
                    </Flex>
                    <IconDotsVertical />
                </Flex>

                <Flex direction='column' justify='space-between' align='center'>
                    <Flex w='80dvw' h='45dvh' position='relative' justify='center'>
                    <Card w='90%' h='100%' position='absolute' top={-6} filter='brightness(70%)'></Card>
                    <Card w='95%' h='100%' position='absolute' top={-3} filter='brightness(80%)'></Card>
                    <Draggable>
                        <Box w='100%' h='100%' position='absolute' cursor='auto' ref={card1Ref}>
                            <FlippableFlashCard flashCard={currentFlashCard()} />
                        </Box>
                    </Draggable>
                    </Flex>
                </Flex>

                <Flex w='100%' direction='column' gap={2}>
                    <Text opacity={0.7} fontSize='sm' alignSelf='end'>{currentWord} / {flashCards!.length}</Text>
                    <Progress value={currentWord} max={flashCards!.length} colorScheme="teal" w='100%' borderRadius='md' />
                </Flex>
            </Flex>
            </DndContext>)}
        </Flex>
    )
}