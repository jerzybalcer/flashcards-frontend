import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { Deck } from "../../model/Deck";
import { QuizMode } from "../../model/QuizMode";
import { RadioCardGroup } from "../RadioCardGroup";

interface SetupQuizProps {
    deck: Deck;
    onStartQuiz: (numberOfCards: number, quizMode: QuizMode) => void;
}

export const SetupQuiz: React.FC<SetupQuizProps> = ({ deck, onStartQuiz }) => {
    const defaultNumberOfCards = Math.floor(deck.cardsCount/2) % 2 === 0 ? Math.floor(deck.cardsCount/2) : Math.ceil(deck.cardsCount/2);

    const [numbersOfCards, setNumberOfCards] = useState<number>(defaultNumberOfCards);
    const [quizMode, setQuizMode] = useState<QuizMode>(QuizMode.SingleChoice);

    return  <Flex direction='column' justifyContent='space-between' h='100%'>
        <Heading>Setup</Heading>
        <Flex direction="column" w='100%' justify='center' alignSelf='center' flexGrow={1}>
            <FormControl isRequired display='flex' justifyContent='center' flexDir='column' gap={8} px={4}>
                <Box>
                    <FormLabel>Number of cards</FormLabel>
                    <NumberInput defaultValue={defaultNumberOfCards} 
                        min={1} 
                        max={deck.cardsCount} 
                        onChange={(_, number) => setNumberOfCards(number)} 
                        isDisabled
                        size='lg'
                        borderRadius='xl'>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                </Box>
                <Box>
                    <FormLabel>Mode</FormLabel>
                    <RadioCardGroup defaultValue={QuizMode.SingleChoice} 
                        onChange={(value) => setQuizMode(value as QuizMode)} 
                        options={Object.values(QuizMode)}
                        isDisabled/>
                </Box>
            </FormControl>
        </Flex>
        <Button py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => onStartQuiz(numbersOfCards, quizMode)}>Start Quiz</Button>
    </Flex>
}