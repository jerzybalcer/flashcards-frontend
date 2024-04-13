import { useState } from "react"
import { useQuery } from "react-query"
import { Button, Center, Flex, Text } from "@chakra-ui/react"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { PageHeading } from "../components/PageHeading"
import { FlippableFlashCard } from "../components/FlippableFlashCard/FlippableFlashCard"
import { getCards } from "../services/CardService"

export const LearnPage = () => {
    const [currentWord, setCurrentWord] = useState<number>(1);

    const { isLoading: cardsLoading, data: flashCards } = useQuery('cards', getCards);

    const currentFlashCard = () => flashCards![currentWord - 1];

    return (
        <Flex direction='column' h='100%'>
            <PageHeading title="Learn" />
            <Flex mx={4} justifyContent='space-between'>
                <Flex justify='left' gap={2}>
                    <Text>Currently learning: </Text>
                    <Text fontWeight={500}>Italiano</Text>
                </Flex>
                <Text>
                    {currentWord} / {flashCards?.length ?? 1}
                </Text>
            </Flex>

            {!cardsLoading && (
            <Flex direction='column' justifyContent='space-around' align='center' h='100%' p={6}>
                <Center w='80dvw' h='45dvh'>
                    <FlippableFlashCard flashCard={currentFlashCard()} />
                </Center>
                <Flex justifyContent='center' alignItems='center' w='100%' gap={4}>
                    <Button isDisabled={currentWord === 1} size='lg' leftIcon={<IconArrowLeft />} onClick={() => setCurrentWord(currentWord - 1)}>Previous word</Button>
                    <Button isDisabled={currentWord === flashCards!.length} size='lg' rightIcon={<IconArrowRight />} onClick={() => setCurrentWord(currentWord + 1)}>Next word</Button>
                </Flex>
            </Flex>
            )}
        </Flex>
    )
}