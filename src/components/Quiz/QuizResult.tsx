import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { QuizResultStat } from "./QuizResultStat";

interface QuizResultProps {
    onStartAgain: () => void;
    onFinish: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ onStartAgain, onFinish }) => {
    return <Flex direction='column' h='100%' gap={6}>
        <Box>
            <Heading mb={2}>Quiz result</Heading>
            <Text>Deck: Italiano</Text>
        </Box>
        <Flex direction='column' flexGrow={1} overflowY='auto' overflowX='hidden' position='relative'>
            <Flex position='absolute' direction='column' w='100%' pr={2} gap={4}>
                <QuizResultStat label="Correct answers" value="16 / 20" details="Great! Keep it up!"/>
                <QuizResultStat label="Fastest answer" value="Foreign word" details="1.12 seconds"/>
                <QuizResultStat label="Longest answer" value="Foreign word" details="15.32 seconds"/>
                <QuizResultStat label="Well known" value="Foreign word" details="8 correct answers in a row"/>
                <QuizResultStat label="Greatest challenge" value="Foreign word" details="Struggling the 6th time"/>
                <QuizResultStat label="Just learned" value="Foreign word" details="And 11 more new words"/>
            </Flex>
        </Flex>
        <Center gap={4}>
            <Button size='lg' variant='outline' onClick={() => onStartAgain()}>Start again</Button>
            <Button size='lg' colorScheme="teal" onClick={() => onFinish()}>New quiz</Button>
        </Center>
    </Flex>;
};