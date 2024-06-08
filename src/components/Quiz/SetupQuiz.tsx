import { useContext, useEffect } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { Deck } from "../../model/Deck";
import { QuizMode, QuizModes } from "../../model/QuizMode";
import { RadioCardGroup } from "../RadioCardGroup";
import { useQueryClient } from "react-query";
import { QuizContext } from "../../contexts/QuizContext";
import { QueryKeys } from "../../hooks/queries/queryKeys";

interface SetupQuizProps {
    deck: Deck;
    onStartQuiz: () => void;
}

export const SetupQuiz: React.FC<SetupQuizProps> = ({ deck, onStartQuiz }) => {
    const defaultNumberOfCards = Math.round(deck.cardsCount/2);

    const context = useContext(QuizContext)!;

    const queryClient = useQueryClient();

    useEffect(() => { 
        queryClient.invalidateQueries([QueryKeys.quizCards, deck.id])
        context.setNumberOfCards(defaultNumberOfCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return  <Flex direction='column' justifyContent='space-between' h='100%'>
        <Heading>Setup</Heading>
        <Flex direction="column" w='100%' justify='center' alignSelf='center' flexGrow={1}>
            <FormControl isRequired display='flex' justifyContent='center' flexDir='column' gap={8} px={4}>
                <Box>
                    <FormLabel>Number of cards</FormLabel>
                    <NumberInput defaultValue={defaultNumberOfCards} 
                        min={1} 
                        max={deck.cardsCount} 
                        onChange={(_, number) => context.setNumberOfCards(number)} 
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
                    <RadioCardGroup defaultValue={QuizModes[QuizMode.SingleChoice]} 
                        onChange={() => {}} 
                        options={Object.values(QuizModes)}
                        isDisabled/>
                </Box>
            </FormControl>
        </Flex>
        <Button py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => onStartQuiz()}>Start Quiz</Button>
    </Flex>
}