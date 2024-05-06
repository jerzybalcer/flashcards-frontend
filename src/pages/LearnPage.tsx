import { useState } from "react"
import { Button, Center, Flex, Text } from "@chakra-ui/react"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { PageHeading } from "../components/PageHeading"
import { FlippableFlashCard } from "../components/FlippableFlashCard/FlippableFlashCard"
import { useLocation } from "react-router-dom"

export const LearnPage = () => {
    const [currentWord, setCurrentWord] = useState<number>(1);

    const { state } = useLocation();

    const currentFlashCard = () => state.cards![currentWord - 1];

    return (
        <Flex direction='column' h='100%'>
            <PageHeading canGoBack />
            <Flex mx={4} justifyContent='space-between'>
                <Flex justify='left' gap={2}>
                    <Text>Currently learning: </Text>
                    <Text fontWeight={500}>{state.deck.name}</Text>
                </Flex>
                <Text>
                    {currentWord} / {state.cards?.length ?? 1}
                </Text>
            </Flex>

            <Flex direction='column' justifyContent='space-between' align='center' h='100%' p={6}>
                <Center w='80dvw' h='45dvh' mt='10vh'>
                    <FlippableFlashCard flashCard={currentFlashCard()} />
                </Center>
                <Flex justifyContent='center' alignItems='center' w='100%' gap={4}>
                    <Button isDisabled={currentWord === 1} size='lg' leftIcon={<IconArrowLeft />} onClick={() => setCurrentWord(currentWord - 1)}>Previous word</Button>
                    <Button isDisabled={currentWord === state.cards!.length} size='lg' rightIcon={<IconArrowRight />} onClick={() => setCurrentWord(currentWord + 1)}>Next word</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}