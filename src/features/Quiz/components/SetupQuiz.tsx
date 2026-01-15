import { useContext, useEffect } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading } from "@chakra-ui/react"
import { Deck } from "../../../model/Deck";
import { QuizMode, QuizModes } from "../../../model/QuizMode";
import { RadioCardGroup } from "@/shared/components/RadioCardGroup";
import { useQueryClient } from "react-query";
import { QuizContext } from "@/features/Quiz/context/QuizContext";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { NumberInput } from "../../../shared/components/NumberInput";

interface SetupQuizProps {
    deck: Deck;
    onStartQuiz: () => void;
}

export const SetupQuiz: React.FC<SetupQuizProps> = ({ deck, onStartQuiz }) => {
    const defaultNumberOfCards = deck.cardsCount >= 20 ? 20 : deck.cardsCount;

    const context = useContext(QuizContext)!;

    const queryClient = useQueryClient();

    useEffect(() => { 
        queryClient.invalidateQueries([QueryKeys.quizCards, deck.id])
        context.setNumberOfCards(defaultNumberOfCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
    <Flex direction='column' justifyContent='space-between' h='100%'>
        <Heading>Setup</Heading>
        <Flex direction="column" w='100%' justify='center' alignSelf='center' flexGrow={1}>
            <FormControl isRequired display='flex' justifyContent='center' flexDir='column' gap={8} px={4}>
                <Box>
                    <FormLabel>Number of cards</FormLabel>
                    <NumberInput defaultValue={defaultNumberOfCards} min={10} max={deck.cardsCount} onChange={value => context.setNumberOfCards(value)}/>
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
    );
}