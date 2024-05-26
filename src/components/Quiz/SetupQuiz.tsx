import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, SimpleGrid } from "@chakra-ui/react"
import { Deck } from "../../model/Deck";
import { QuizMode } from "../../model/QuizMode";

interface SetupQuizProps {
    deck: Deck;
    onStartQuiz: (numberOfCards: number, quizMode: QuizMode) => void;
}

export const SetupQuiz: React.FC<SetupQuizProps> = ({ deck, onStartQuiz }) => {
    const defaultNumberOfCards = Math.max(20, deck.cardsCount/2);

    const [numbersOfCards, setNumberOfCards] = useState<number>(defaultNumberOfCards);
    const [quizMode, setQuizMode] = useState<QuizMode>(QuizMode.SingleChoice);

    return  <Flex direction='column' justifyContent='space-between' h='100%'>
        <Heading>Setup</Heading>
        <Flex direction="column" w='100%' justify='center' alignSelf='center' flexGrow={1}>
            <FormControl isRequired display='flex' justifyContent='center' flexDir='column' gap={8} px={4}>
                <Box>
                    <FormLabel>Number of cards</FormLabel>
                    <NumberInput defaultValue={defaultNumberOfCards} min={Math.max(10, deck.cardsCount/2)} max={deck.cardsCount} onChange={(_, number) => setNumberOfCards(number)} isDisabled>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                </Box>
                <Box>
                    <FormLabel>Mode</FormLabel>
                    <RadioGroup defaultValue={QuizMode.SingleChoice} onChange={(value) => setQuizMode(value as QuizMode)}>
                        <SimpleGrid columns={2} spacing={4}>
                            <Radio value={QuizMode.SingleChoice}>Single-choice</Radio>
                            <Radio value={QuizMode.OpenText} isDisabled>Open-text</Radio>
                            <Radio value={QuizMode.TrueFalse} isDisabled>True/false</Radio>
                            <Radio value={QuizMode.Mixed} isDisabled>Mixed</Radio>
                        </SimpleGrid>
                    </RadioGroup>
                </Box>
            </FormControl>
        </Flex>
        <Button py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => onStartQuiz(numbersOfCards, quizMode)}>Start Quiz</Button>
    </Flex>
}