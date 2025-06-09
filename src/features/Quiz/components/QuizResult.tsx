import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { QuizResultStat } from "./QuizResultStat";
import { Deck } from "@/model/Deck";
import { useContext } from "react";
import { QuizContext } from "@/features/Quiz/context/QuizContext";

interface QuizResultProps {
    deck: Deck;
    onStartAgain: () => void;
    onFinish: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ deck, onStartAgain, onFinish }) => {

    const context = useContext(QuizContext)!;

    const numberCorrectAnswers = context.answeredQuestions.filter(c => c.answerCorrect).length;
    const fastestAnswer = context.answeredQuestions.sort((a, b) => a.answerTimeMs - b.answerTimeMs)[0];
    const longestAnswer = context.answeredQuestions.sort((a, b) => b.answerTimeMs - a.answerTimeMs)[0];

    const numberCorrectAnswersText = () => {
        const percent = numberCorrectAnswers/context.numberOfCards;

        if(percent <= 0.25) return 'At least you know some of them!';
        else if(percent <= 0.5) return 'You already know half of them!';
        else if(percent <= 0.75) return 'Great! Keep it up!';
        else return 'Perfect! You nailed it!';
    }

    return <Flex direction='column' h='100%' gap={6}>
        <Box>
            <Heading mb={2}>Quiz result</Heading>
            <Text opacity={0.8} fontSize='lg'>{deck.name}</Text>
        </Box>
        <Flex direction='column' flexGrow={1} overflowY='auto' overflowX='hidden' position='relative'>
            <Flex position='absolute' direction='column' w='100%' pr={2} gap={4}>
                <QuizResultStat label="Correct answers" value={numberCorrectAnswers + ' / ' + context.numberOfCards} details={numberCorrectAnswersText()}/>
                <QuizResultStat label="Fastest answer" value={fastestAnswer.flashCard.foreignWord} details={fastestAnswer.answerTimeMs / 1000 + ' seconds'}/>
                <QuizResultStat label="Longest answer" value={longestAnswer.flashCard.foreignWord} details={longestAnswer.answerTimeMs / 1000 + ' seconds'}/>
                {/* <QuizResultStat label="Well known" value="Foreign word" details="8 correct answers in a row"/>
                <QuizResultStat label="Greatest challenge" value="Foreign word" details="Struggling the 6th time"/>
                <QuizResultStat label="Just learned" value="Foreign word" details="And 11 more new words"/> */}
            </Flex>
        </Flex>
        <Flex w='100%' gap={2} align='center'>
            <Button w='40%' py={6} fontSize='md' colorScheme="blue" borderRadius='xl' variant='link' onClick={() => onStartAgain()}>Start again</Button>
            <Button w='60%' py={6} fontSize='md' colorScheme="blue" borderRadius='xl' onClick={() => onFinish()}>New quiz</Button>
        </Flex>
    </Flex>;
};